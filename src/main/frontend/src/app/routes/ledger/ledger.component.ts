import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommonCode, Ledger} from './ledger.model';
import Grid from 'tui-grid';
import {NumberUtil} from '@app/util/number.util';
import {ActivatedRoute, Router} from '@angular/router';
import {ledgerThemeOptions} from '@app/routes/ledger/grid/options';
import {Row} from "tui-grid/types/store/data";

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css'],
})
export class LedgerComponent implements OnInit {
  @ViewChild('grid', {static: true}) myGrid: ElementRef;
  @ViewChild('deleteModal', {static: true}) deleteModal: ElementRef;

  private grid: Grid;
  private year;
  private month;
  // private rows = [];

  constructor(private readonly http: HttpClient, private readonly router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    await this.initGrid();

    // TOAST UI 기본 설정
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length === 0) {
        // query param 이 없는 경우에는 default 로 현재 날짜 기준 년/월을 셋팅하여 라우팅합니다.
        const today = moment();
        const year = today.format('YYYY');
        const month = today.format('MM');

        this.router.navigate(['/ledger'], {queryParams: {year: year, month: month}});
        return;
      }

      let httpParams = new HttpParams().set('year', params.year).set('month', params.month);
      this.year = params.year;
      this.month = params.month;

      this.http.get('/api/ledger', {params: httpParams}).subscribe((res: any) => {
        const rows = [];
        const data = res.data;
        data.map((ledger) => {
          const {id, sequence, stndDate, itemCode, itemName, note, income, expenditure, balance} = ledger;
          rows.push({
            id,
            sequence,
            date: moment(stndDate).format('YYYY/MM/DD'),
            // item: itemName,
            item: itemCode,
            note,
            income,
            expenditure,
            balance,
          });
        });

        this.grid.resetData(rows);
      });
    });
  }

  async initGrid() {
    let listItems = [];

    let res: any = await this.http.get('/api/common-codes/LEDGER01').toPromise();
    const data: [CommonCode] = res.data;
    data.map((commonCode) => {
      console.log(commonCode.dtlCode, commonCode.dtlCodeName);
      listItems.push({text: commonCode.dtlCodeName, value: commonCode.dtlCode});
    });

    this.grid = new Grid({
      el: this.myGrid.nativeElement,
      width: 1158,
      bodyHeight: 400,
      scrollX: false,
      scrollY: true,
      rowHeaders: ['checkbox'],
      columns: [
        {
          header: '순서',
          name: 'sequence',
          width: 50,
          align: 'center',
        },
        {
          header: '일자',
          name: 'date',
          width: 100,
          editor: {
            type: 'datePicker',
            options: {
              format: 'yyyy/MM/dd',
            },
          },
        },
        {
          header: '항목',
          name: 'item',
          width: 150,
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: listItems,
            },
          },
          copyOptions: {
            useListItemText: true,
          },
        },
        {
          header: '비고',
          name: 'note',
          width: 500,
          editor: 'text',
          // onAfterChange(ev) {
          //   console.log('Name after change:', ev);
          // },
        },
        {
          header: '수입',
          name: 'income',
          width: 100,
          editor: 'text',
          align: 'right',
          formatter: NumberUtil.formatter,
        },
        {
          header: '지출',
          name: 'expenditure',
          width: 100,
          editor: 'text',
          align: 'right',
          formatter: NumberUtil.formatter,
        },
        {
          header: '잔고',
          name: 'balance',
          width: 100,
          // editor: 'text',
          align: 'right',
          formatter: NumberUtil.formatter,
        },
      ],
    });

    Grid.applyTheme('default', ledgerThemeOptions); // 'default' | 'striped' | 'clean'

    this.grid.on('editingFinish', (ev: any) => {
      const columnName = ev.columnName;
      // console.log(`columnName : ${columnName}`);
      // // 수입이나 지출 항목에 대한 편집이 끝나면 잔고를 다시 계산해줍니다.
      if (columnName === 'income' || columnName === 'expenditure') {
        this.onCalculate();
      }
    });
  }

  /**
   * 그리드의 행을 하나 추가합니다.
   */
  onRowAdd() {
    let inputValue = prompt('몇번째 순서에 행을 추가할까요?');

    if (inputValue === null) {
      // esc 키를 눌렀을 때는 null 을 받습니다. esc 키는 보통 '취소'의 의미로 사용되므로, esc 키를 눌렀을 때는 아무 동작도 하지 않고 종료합니다.
      return;
    }

    if (inputValue === '') {
      // 아무 입력없이 확인 눌렀을 때, 맨 아래 행 추가
      this.grid.appendRow({sequence: this.grid.getRowCount() + 1});
      return;
    }

    let matchers = /^[0-9]+$/;

    if (!inputValue.match(matchers)) {
      alert('숫지만 입력 가능합니다!');
      return;
    }

    if (Number.parseInt(inputValue) > this.grid.getRowCount() || Number.parseInt(inputValue) < 1) {
      alert(`1 ~ ${this.grid.getRowCount()} 사이의 숫자를 입력하세요!`);
      return;
    }

    let index = Number.parseInt(inputValue) - 1;
    this.grid.appendRow({}, {at: index});

    const rows: any[] = this.grid.getData();

    rows.map((row, index) => {
      row.sequence = index + 1;
    });

    this.grid.resetData(rows);
  }

  onSave() {
    console.log('onSave()!');
    // console.log(this.grid.getData());

    const postData = this.grid.getData().map((data: any) => {
      console.log(typeof data.date);
      return {
        id: data.id,
        sequence: data.sequence,
        stndDate: moment(data.date, 'YYYY/MM/DD'), // 날짜 변환....
        itemCode: data.item,
        // itemName:,
        note: data.note,
        income: data.income,
        expenditure: data.expenditure,
        balance: data.balance,
      };
    });

    console.log(postData);

    this.http.post('/api/ledger', postData).subscribe((data) => console.log(data));
    // TODO : data 저장 성공 여부에 대한 메시지를 보여주는 로직이 추가되어야 합니다.
  }

  /**
   * 전체 행의 잔고를 다시 계산해줍니다.
   */
  onCalculate() {
    const rows: any[] = this.grid.getData();
    let prevBalance: number = 0;
    // prevBalance 의 default 값이 0 으로 설정되어 있기 때문에 첫번째 잔고는 "수입 - 지출"이 계산됩니다.
    rows.map((row) => {
      if (!row.income) {
        row.income = 0;
      }
      if (!row.expenditure) {
        row.expenditure = 0;
      }

      row.balance = prevBalance + Number.parseInt(row.income) - Number.parseInt(row.expenditure);
      prevBalance = row.balance;
    });

    this.grid.resetData(rows);
  }

  onBack() {
    const monthAgo = moment(`${this.year}-${this.month}`, 'YYYY-MM').subtract(1, 'months');
    const year = monthAgo.format('YYYY');
    const month = monthAgo.format('MM');
    this.router.navigate(['/ledger'], {queryParams: {year: year, month: month}});
  }

  onForward() {
    const monthAfter = moment(`${this.year}-${this.month}`, 'YYYY-MM').add(1, 'months');
    const year = monthAfter.format('YYYY');
    const month = monthAfter.format('MM');
    this.router.navigate(['/ledger'], {queryParams: {year: year, month: month}});
  }

  onDelete() {
    console.log(`onDelete()`);
    const rows: Row[] = this.grid.getCheckedRows();
    rows.map(row => {
      console.log(row);
    });

    const el = this.deleteModal.nativeElement;
    el.classList.add('visible');
    el.classList.add('active');
    console.log(el.classList);
  }

  onDeleteModalNo() {
    console.log('no!!');
    const el = this.deleteModal.nativeElement;
    el.classList.remove('visible');
    el.classList.remove('active');
  }

  onDeleteModalYes() {
    console.log('yes!!');
    const el = this.deleteModal.nativeElement;
    el.classList.remove('visible');
    el.classList.remove('active');
  }
}
