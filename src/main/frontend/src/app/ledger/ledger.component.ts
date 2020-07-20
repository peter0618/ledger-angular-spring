import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
declare var RealGridJS;

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  gridView;
  gridDataProvider;

  constructor() { }

  ngOnInit(): void {
    this.gridView = new RealGridJS.GridView('realgrid'); // html 선언ID
    this.gridDataProvider = new RealGridJS.LocalDataProvider();
    this.gridView.setDataSource(this.gridDataProvider);

    this.gridDataProvider.setFields([
      {
        fieldName: 'date',
        dataType: 'datetime',
      },
      {
        fieldName: 'item',
      },
      {
        fieldName: 'note',
      },
      {
        fieldName: 'income',
        dataType: 'number',
      },
      {
        fieldName: 'expenditure',
        dataType: 'number',
      },
      {
        fieldName: 'balance',
        dataType: 'number',
        // calculateCallback: this.balanceCalculator,
      },
    ]);

    this.gridView.setColumns([
      {
        name: 'date',
        fieldName: 'date',
        editable: true,
        header: {
          text: '일자',
        },
        editor: {
          type: 'date',
          maxLength: 6,
          yearNavigation: true,
        },
        width: '100',
      },
      {
        name: 'item',
        fieldName: 'item',
        editable: true,
        header: {
          text: '항목',
        },
        type: 'data',
        width: '150',
      },
      {
        name: 'note',
        fieldName: 'note',
        editable: true,
        header: {
          text: '비고',
        },
        type: 'data',
        width: '400',
      },
      {
        name: 'income',
        fieldName: 'income',
        editable: true,
        header: {
          text: '수입',
        },
        type: 'data',
        width: '100',
        styles: {
          textAlignment: 'far',
          numberFormat: '#,##0',
        },
      },
      {
        name: 'expenditure',
        fieldName: 'expenditure',
        editable: true,
        header: {
          text: '지출',
        },
        type: 'data',
        width: '100',
        styles: {
          textAlignment: 'far',
          numberFormat: '#,##0',
        },
      },
      {
        name: 'balance',
        fieldName: 'balance',
        editable: true,
        header: {
          text: '잔액',
        },
        type: 'data',
        width: '100',
        styles: {
          textAlignment: 'far',
          numberFormat: '#,##0',
        },
      },
    ]);

    this.gridDataProvider.setRows([
      {
        date: '2020/07/01',
        item: '이월잔액',
        note: '이월잔액',
        income: 381194,
        expenditure: null,
        balance: 381194,
      },
      {
        date: '2020/07/01',
        item: '예산입금',
        note: '7월 예산 입금',
        income: 250000,
        expenditure: null,
        balance: 631194,
      },
      {
        date: '2020/07/01',
        item: '예산 외 항목 지출',
        note: '간식(라면24개)',
        income: null,
        expenditure: 14870,
        balance: 616324,
      },
      {
        date: '2020/07/02',
        item: '찬양팀',
        note: '회식비',
        income: null,
        expenditure: 50000,
        balance: 566324,
      },
    ]);

    this.gridView.setPasteOptions({
      enabled: true,
    });
  }

  onSave(): void {
    console.log('onSave()');
    this.gridView.commit();
    const rows = this.gridDataProvider.getJsonRows(0, -1);
    rows.map((row) => {
      const {date, item, note, income, expenditure, balance} = row;
      console.log(
        `date : ${moment(date).format(
          'YYYY/MM/DD',
        )}, item : ${item}, note: ${note}, income : ${income}, expenditure : ${expenditure}, balance : ${balance}`,
      );
    });
  }
}
