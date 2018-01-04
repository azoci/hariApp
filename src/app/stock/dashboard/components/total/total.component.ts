import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { InvestService } from '../../../../shared/services/stock-service/invest.service';
import { HistoryService } from '../../../../shared/services/stock-service/history.service';
import { MatPaginator, MatTableDataSource, MatSort  } from '@angular/material';

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.scss',
        '../../../../../../node_modules/nvd3/build/nv.d3.css'
    ],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})
export class TotalComponent implements OnInit {
    @ViewChild(MatSort) tradeSort: MatSort;
    @ViewChild('paginator') tradePaginator: MatPaginator;
    @ViewChild('paginator2') eventPaginator: MatPaginator;
    public amtOptions = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.3r')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: '투자금액(원)'
            },
            yAxis: {},
            showYAxis: false,
            forceY: [0, ],
        }
    };
    public priceOptions = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 45,
                left: 45
            },
            clipEdge: true,
            //staggerLabels: true,
            duration: 500,
            stacked: false,
            xAxis: {
                axisLabel: '주가(원)',
                showMaxMin: false,
            },
            yAxis: {
                axisLabelDistance: -20,
                tickFormat: function(d){
                return d3.format(',.3r')(d);
                }
            }
        }
    };

    //bar chart
    public amt: any[];
    public amtBar: any[];
    public priceBar: any[];
    public bup: any[] = []; // 적정주가(버핏)
    public grp: any[] = []; // 적정주가(그레이엄, 7.2% 10년)
    public crp: any[] = []; // 현재주가
    public byp: any[] = []; // 매입주가

    public tradeColumns = ['dt', 'type_nm', 'nm', 'num', 'price', 'amt', 'content'];
    public eventColumns = ['dt', 'nm', 'prate', 'drate', 'content'];
    public tradeDS: any;
    public eventDS: any;
  constructor(private investService: InvestService,
        private historyService: HistoryService) {}

  ngOnInit() {
      this.investService.getItem().subscribe(res => {
          let items;
          let invAmt = [];
          for (let i of res.results) {
              invAmt.push({'label': i.nm, 'value': i.buy_amt});
              this.byp.push({x: i.nm, y: i.buy_price});
          }
          this.amtBar = [{
              key: '자기자본순이익률(%)',
              values: invAmt
          }];

          items = res.results;
          this.investService.getAnaysis().subscribe(res => {
              const data = res.results;
              for (let i of items) {
                  const element = data.filter(e => e.skey === i.skey);
                  for (let j of element) {
                      switch (j.value_ckey) {
                          case 403 :
                              this.bup.push({x: i.nm, y: j.tvalue});
                              break;
                          case 404 :
                              this.grp.push({x: i.nm, y: j.tvalue});
                              break;
                          case 405 :
                              this.crp.push({x: i.nm, y: j.tvalue});
                              break;
                          default :
                              break;
                      }
                  }
              }
              this.priceBar = [{
                  key: '매입주가',
                  values: this.byp
              } , {
                  key: '현재주가',
                  values: this.crp
              } , {
                  key: '적정주가(버핏)',
                  values: this.bup
              } , {
                  key: '적정주가(그레이엄, 7.2% 10년)',
                  values: this.grp
              }];
          });
      });
      this.historyService.getTrades().subscribe(res => {
          this.tradeDS = new MatTableDataSource<Trade>(res.results);
          this.tradeDS.sort = this.tradeSort;
          this.tradeDS.paginator = this.tradePaginator;
      });
      this.historyService.getEvents().subscribe(res => {
          this.eventDS = new MatTableDataSource<Event>(res.results);
          this.eventDS.paginator = this.eventPaginator;
      });
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
    prate: number;
    drate: number;
    content: string;

}
