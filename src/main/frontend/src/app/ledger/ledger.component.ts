import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {Ledger} from './ledger.model';
import Grid from 'tui-grid';
import {NumberUtil} from '../util/number.util';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css'],
})
export class LedgerComponent implements OnInit {
  @ViewChild('grid', {static: true}) myGrid: ElementRef;

  private grid: Grid;
  private rows = [];

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    // TOAST UI 기본 설정
    this.grid = new Grid({
      el: this.myGrid.nativeElement,
      width: 1100,
      scrollX: false,
      scrollY: false,
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
          editor: 'text',
          align: 'right',
          formatter: NumberUtil.formatter,
        },
      ],
    });
    Grid.applyTheme('default'); // 'default' | 'striped' | 'clean'

    this.http.get('/api/monthly').subscribe((data: [Ledger]) => {
      // const rows = [];
      data.map((ledger) => {
        const {id, sequence, stndDate, itemCode, itemName, note, income, expenditure, balance} = ledger;
        this.rows.push({
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
      console.log(this.rows);

      this.grid.resetData(this.rows);
    });

    this.grid.on('editingStart', (ev) => {
      // console.log('change focused cell!', ev);

      // TOAST UI 문서를 찾아봐도 뭔가 해당 이슈 해결이 어려워보여서 임시로 이렇게 해결함
      setTimeout(() => {
        let el = document.getElementsByClassName('tui-grid-editor-select-box-layer');
        if (el.length !== 0) {
          el[0].classList.add('tui-grid-layer-editing');
        }
      }, 10);
    });
  }

  onAdd() {
    let inputValue = prompt('몇번째 순서에 행을 추가할까요?');
    // TODO : idx 에 넣을 수 있는 값에 대한 validation 추가가 필요합니다.
    if (inputValue !== null) {
      let index = Number.parseInt(inputValue) - 1;
      // console.log(index);

      this.rows.map((row) => {
        if(row.sequence > index){
          row.sequence++;
        }
      });

      this.rows.splice(index, 0, {
        sequence: index + 1
      });

      this.grid.resetData(this.rows);
    }
    // console.log(this.rows);
  }

  onSave() {
    console.log('onSave()!');
  }
}
