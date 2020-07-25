import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {Ledger} from './ledger.model';
declare var RealGridJS;

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css'],
})
export class LedgerComponent implements OnInit {
  gridView;
  gridDataProvider;

  constructor(private readonly http: HttpClient) {}

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

    this.http.get('/api/monthly').subscribe((data: [Ledger]) => {
      const rows = [];
      data.map((ledger) => {
        const {id, stndDate, itemCode, itemName, note, income, expenditure, balance} = ledger;
        rows.push({
          id,
          date: moment(stndDate).format('YYYY/MM/DD'),
          item: itemName,
          note,
          income,
          expenditure,
          balance,
        });
      });
      console.log(rows);

      this.gridDataProvider.setRows(rows);
    });


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
    // this.http.get('/api/test').subscribe((data) => {
    //   console.log(data);
    // });
  }
}
