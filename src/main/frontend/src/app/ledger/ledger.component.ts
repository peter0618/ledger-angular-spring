import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Ledger} from './ledger.model';
import Grid from 'tui-grid';
import {NumberUtil} from '../util/number.util';
import {ActivatedRoute, Router} from '@angular/router';
import {GridEventName} from 'tui-grid/types/options';
import {ledgerThemeOptions} from './grid/options';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css'],
})
export class LedgerComponent implements OnInit {
  @ViewChild('grid', {static: true}) myGrid: ElementRef;

  private grid: Grid;
  private year;
  private month;
  // private rows = [];

  constructor(private readonly http: HttpClient, private readonly router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // TOAST UI 기본 설정
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length === 0) {
        // query param 이 없는 경우에는 default 로 2020년 7월 데이터를 가져옵니다. TODO : 현 월을 default 로 설정하도록 변경되어야 합니다.
        this.router.navigate(['/ledger'], {queryParams: {year: '2020', month: '07'}});
      }

      let httpParams = new HttpParams().set('year', params.year).set('month', params.month);
      this.year = params.year;
      this.month = params.month;

      this.http.get('/api/monthly', {params: httpParams}).subscribe((data: [Ledger]) => {
        const rows = [];
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
        // console.log(this.rows);

        this.grid.resetData(rows);
      });
    });

    this.grid = new Grid({
      el: this.myGrid.nativeElement,
      width: 1120,
      bodyHeight: 400,
      scrollX: false,
      scrollY: true,
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
              listItems: [
                {text: '이월잔액', value: '00'},
                {text: '예산입금', value: '01'},
                {text: '예산 외 항목 지출', value: '02'},
                {text: '찬양팀', value: '03'},
              ],
            },
          },
          copyOptions: {
            useListItemText: true,
          }
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

    this.grid.on('editingStart', (ev) => {
      // console.log('change focused cell!', ev);
      // TOAST UI 문서를 찾아봐도 뭔가 해당 이슈 해결이 어려워보여서 임시로 이렇게 해결함
      // setTimeout(() => {
      //   let el = document.getElementsByClassName('tui-grid-editor-select-box-layer');
      //   if (el.length !== 0) {
      //     el[0].classList.add('tui-grid-layer-editing');
      //   }
      // }, 10);
    });

    this.grid.on('editingFinish', (ev: any) => {
      const columnName = ev.columnName;
      console.log(`columnName : ${columnName}`);
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

    this.http.post('/api/monthly', postData).subscribe((data) => console.log(data));
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
}
