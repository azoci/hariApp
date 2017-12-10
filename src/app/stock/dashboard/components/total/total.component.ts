import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { AnalysisService } from '../../../../shared/services/stock-service/analysis.service';
import { HistoryService } from '../../../../shared/services/stock-service/history.service';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.scss'],
    animations: [routerTransition()]
})
export class TotalComponent implements OnInit {

    public inv; //

    //bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        '`A',
        '`B',
        '`C',
        '`A',
        '`B',
        '`C',
        '`A',
        '`B',
        '`C',
        '`A',
        '`B',
        '`C'
    ];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    // lineChart
    public lineChartLabels: string[] = [
        '`A',
        '`B',
        '`C',
        '`A',
        '`B',
        '`C',
        '`A',
        '`B',
        '`C',
        '`A',
        '`B',
        '`C'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    public invBar: any[] = [{data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]}];
    public priceLine: any[] = [
        { data: [965, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55], label: 'Series A' },
        { data: [528, 48, 40, 19, 86, 27, 28, 48, 40, 19, 86, 27], label: 'Series B' },
        { data: [518, 48, 77, 9, 100, 27, 18, 48, 77, 9, 100, 27], label: 'Series C' }
    ];

    public tradeColumns = ['dt', 'type_nm', 'item_key', 'num', 'price', 'amt', 'content'];
    public eventColumns = ['dt', 'nm', 'rate', 'content'];
    public tradeDS: any;
    public eventDS: any;
  constructor(private analysisService: AnalysisService,
        private historyService: HistoryService) {}

  ngOnInit() {
      this.historyService.getTrades().subscribe(res => this.tradeDS = new MatTableDataSource<Trade>(res.results));
      this.historyService.getEvents().subscribe(res => this.eventDS = new MatTableDataSource<Event>(res.results));

  }

}

export interface Trade {
    dt: string;
    type_nm: string;
    item_key: string;
    num: number;
    price: number;
    amt: number;
    content: string;
}

export interface Event {
    dt: string;
    nm: string;
    rate: number;
    content: string;

}
