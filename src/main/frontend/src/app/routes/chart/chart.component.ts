import {Component, OnInit, HostListener} from '@angular/core';
import {dummyRows} from '@app/routes/ledger/ledger.dummy';
import {debounce} from '@app/shared/debounce.decorator';

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
        value: expenditure ? expenditure : 0,
        extra: {
          date: date ? date : '',
          balance: balance ? balance : '',
          expenditure: income ? income : '',
        },
      };
    });
  }

  single: any[];
  view: any[] = [window.innerWidth, 400];
  totalLabel: string;
  innerWidth: number;

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

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(event) {
    this.view = [window.innerWidth, 400];
  }
}
