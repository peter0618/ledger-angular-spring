import {Component, OnInit} from '@angular/core';
import {dummyRows} from '@app/routes/ledger/ledger.dummy';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.totalLabel = '총합';
    this.single = dummyRows.map((row) => {
      const {income, item, date, balance, expenditure} = row;
      return {
        name: item ? item : '',
        value: income ? income : 0,
        extra: {
          date: date ? date : '',
          balance: balance ? balance : '',
          expenditure: expenditure ? expenditure : '',
        },
      };
    });
  }

  single: any[];
  view: any[] = [700, 400];
  totalLabel: string;

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
