import {Component, OnInit} from '@angular/core';
import Grid from 'tui-grid';
import {dummyRows} from '../ledger/ledger.dummy';

@Component({
  selector: 'app-toast-sample',
  templateUrl: './toast-sample.component.html',
  styleUrls: ['./toast-sample.component.scss'],
})
export class ToastSampleComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const grid = new Grid({
      el: document.getElementById('grid'),
      width: 1050,
      scrollX: false,
      scrollY: false,
      columns: [
        {
          header: '일자',
          name: 'date',
          width: 100,
        },
        {
          header: '항목',
          name: 'item',
          width: 150,
        },
        {
          header: '비고',
          name: 'note',
          width: 500,
        },
        {
          header: '수입',
          name: 'income',
          width: 100,
          align: 'right',
          formatter: this.formatter,
          // formatter({value}) { // 추가
          //   if(!value){
          //     return;
          //   }
          //   return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(Number.parseInt(value.toString())).substr(1);
          // }
        },
        {
          header: '지출',
          name: 'expenditure',
          width: 100,
          align: 'right',
          formatter: this.formatter,
        },
        {
          header: '잔고',
          name: 'balance',
          width: 100,
          align: 'right',
          formatter: this.formatter,
        },
      ],
      data: dummyRows,
    });
    Grid.applyTheme('default'); // 'default' | 'striped' | 'clean'
  }

  private formatter({value}) {
    if (!value) {
      return;
    }
    return new Intl.NumberFormat('ko-KR', {style: 'currency', currency: 'KRW'})
      .format(Number.parseInt(value.toString()))
      .substr(1);
  }
}
