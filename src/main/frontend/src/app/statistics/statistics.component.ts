import {Component, OnInit} from '@angular/core';
import chart from 'tui-chart';
import {dummyRows} from '@app/ledger/ledger.dummy';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('dummyRows', dummyRows);
    const processedRows = dummyRows.map((row) => {
      const {income, item, ...rest} = row;
      return {name: item, data: income || 0};
    });
    console.log('processedRows', processedRows);
    const container = document.getElementById('chart-area');
    const data = {
      categories: ['income'],
      series: processedRows,
    };
    const options = {
      chart: {
        width: 660,
        height: 560,
        // title: 'Usage share of income',
      },
      series: {
        showLegend: true,
        showLabel: true,
        labelAlign: 'center',
        series: {
          colors: [
            '#83b14e',
            '#458a3f',
            '#295ba0',
            '#2a4175',
            '#289399',
            '#289399',
            '#617178',
            '#8a9a9a',
            '#516f7d',
            '#dddddd',
          ],
        },
        label: {
          color: '#fff',
          fontFamily: 'sans-serif',
        },
      },
      legend: {
        visible: true,
      },
    };

    chart.pieChart(container, data, options);
  }
}
