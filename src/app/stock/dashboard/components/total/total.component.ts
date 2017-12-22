import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { InvestService } from '../../../../shared/services/stock-service/invest.service';
import { HistoryService } from '../../../../shared/services/stock-service/history.service';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.scss'],
    animations: [routerTransition()]
})
export class TotalComponent implements OnInit {

    public bizcd: any[] = [];
    //bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [];
    public amt: any[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    // lineChart
    public lineChartLabels: string[] = [];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // Crimson 매입주가
            backgroundColor: 'rgba(220,20,60,0.2)',
            borderColor: 'rgba(220,20,60,1)',
            pointBackgroundColor: 'rgba(220,20,60,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(220,20,60,0.8)'
        },
        {
            // Orange 적정주가(버핏)
            backgroundColor: 'rgba(255,165,0,0.2)',
            borderColor: 'rgba(255,165,0,1)',
            pointBackgroundColor: 'rgba(255,165,0,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,165,0,0.8)'
        },
        {
            // GoldenRod 적정주가(그레이엄, 7.2% 10년)
            backgroundColor: 'rgba(218,165,32,0.2)',
            borderColor: 'rgba(218,165,32,1)',
            pointBackgroundColor: 'rgba(218,165,32,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(218,165,32,1)'
        },
        {
            // DeepSkyBlue 현재주가
            backgroundColor: 'rgba(0,191,255,0.2)',
            borderColor: 'rgba(0,191,255,1)',
            pointBackgroundColor: 'rgba(0,191,255,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0,191,255,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    public invBar: any[] = [{data: []}];
    public priceLine: any[] = [
        { data: [965, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55], label: 'Series A' },
        { data: [528, 48, 40, 19, 86, 27, 28, 48, 40, 19, 86, 27], label: 'Series B' },
        { data: [518, 48, 77, 9, 100, 27, 18, 48, 77, 9, 100, 27], label: 'Series C' },
        { data: [18, 48, 77, 9, 100, 528, 48, 40, 19, 86, 81, 56], label: 'Series D' }
    ];
    public bup: any[] = []; // 적정주가(버핏)
    public grp: any[] = []; // 적정주가(그레이엄, 7.2% 10년)
    public crp: any[] = []; // 현재주가
    public byp: any[] = []; // 매입주가

    public tradeColumns = ['dt', 'type_nm', 'nm', 'num', 'price', 'amt', 'content'];
    public eventColumns = ['dt', 'nm', 'rate', 'content'];
    public tradeDS: any;
    public eventDS: any;
  constructor(private investService: InvestService,
        private historyService: HistoryService) {}

  ngOnInit() {
      this.investService.getItem().subscribe(res => {
          console.log(res);
          let items;
          for (let i of res.results) {
              this.barChartLabels.push(i.nm);
              this.amt.push(Math.round(i.buy_amt));
              this.byp.push(Math.round(i.buy_price));
          }
          this.invBar = [{data: this.amt, label: '투자금액(원)'}];
          items = res.results;
          this.investService.getAnaysis().subscribe(res => {
              const data = res.results;
              for (let i of items) {
                  this.lineChartLabels.push(i.nm);
                  const element = data.filter(e => e.skey === i.skey);
                  for (let j of element) {
                      switch (j.value_ckey+'') {
                          case '403' :
                              this.bup.push(j.tvalue);
                              break;
                          case '404' :
                              this.grp.push(j.tvalue);
                              break;
                          case '405' :
                              this.crp.push(j.tvalue);
                              break;
                          default :
                              break;
                      }
                  }
              }

              this.priceLine = [
                  { data: this.byp, label: '매입주가'},
                  { data: this.bup, label: '적정주가(버핏)' },
                  { data: this.grp, label: '적정주가(그레이엄, 7.2% 10년)' },
                  { data: this.crp, label: '현재주가' }
              ];
              console.log(this.lineChartLabels);
              console.log(this.priceLine);
          });
      });
      this.historyService.getTrades().subscribe(res => {
          console.log(res);
          this.tradeDS = new MatTableDataSource<Trade>(res.results);
      });
      this.historyService.getEvents().subscribe(res => this.eventDS = new MatTableDataSource<Event>(res.results));

  }

}

export interface Trade {
    dt: string;
    type_nm: string;
    nm: string;
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
