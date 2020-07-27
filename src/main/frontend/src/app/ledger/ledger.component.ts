import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {Ledger} from './ledger.model';
import Grid from 'tui-grid';
import {NumberUtil} from "../util/number.util";

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css'],
})
export class LedgerComponent implements OnInit {
  @ViewChild('grid', { static: true }) myGrid: ElementRef;

  private grid: Grid;
  private rows = [];

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    // TOAST UI 기본 설정
    this.grid = new Grid({
      el: this.myGrid.nativeElement,
      width: 1050,
      scrollX: false,
      scrollY: false,
      columns: [
        {
          header: '일자',
          name: 'date',
          width: 100,
          editor: 'text'
        },
        {
          header: '항목',
          name: 'item',
          width: 150,
          editor: 'text'
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
        const {id, stndDate, itemCode, itemName, note, income, expenditure, balance} = ledger;
        this.rows.push({
          id,
          date: moment(stndDate).format('YYYY/MM/DD'),
          item: itemName,
          note,
          income,
          expenditure,
          balance,
        });
      });
      console.log(this.rows);

      this.grid.resetData(this.rows);
    });
  }

  onAdd() {
    console.log('onAdd!!');
    this.rows.push({});
    this.grid.resetData(this.rows);
  }
}
