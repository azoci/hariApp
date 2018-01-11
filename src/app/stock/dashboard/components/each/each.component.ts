import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { ItemService } from '../../../../shared/services/stock-service/item.service';
import { AnalysisService } from '../../../../shared/services/stock-service/analysis.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-each',
  templateUrl: './each.component.html',
  styleUrls: ['./each.component.scss',
      '../../../../../../node_modules/nvd3/build/nv.d3.css'
  ],
  animations: [routerTransition()],
  encapsulation: ViewEncapsulation.None
})
export class EachComponent implements OnInit, OnDestroy {

    private sub;
    private key;
    public item;
    public noti;
    public bizAnal; //기업요소(100)
    public roe; // 자기자본순이익률(301)
    public ros; // 매출수익률(309)
    public cro; //유동비율(313)
    public wcp; //운전자본(314)
    public bup; //버핏가(403)
    public grp; //그레이엄가(404)
    public crp; //현재가(405)
    public bvp; //내재가치(버핏)(401)
    public gvp; //내재가치(그레이엄, 7.2% 10년)(402)

    public croOptions = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function(d){ return '`' + d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',2.2f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: '유동비(유동자산/유동부채)'
            },
        }
    };

    public roeOptions = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function(d) { return '`' + d.label; },
            y: function(d) { return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',2.2f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: '자기자본순이익률(%)'
            },
        }
    };

     public rosOptions = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function(d){ return '`' + d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',2.2f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: '매출수익률(%)'
            },
        }
    };

    public wcpOptions = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function(d) { return '`' + d.label; },
            y: function(d) { return d.value / 100000000; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.3r')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: '운전자본(억)'
            }
        }
    };

    public priceOptions = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d) { return d.x; },
            y: function(d) { return d.y; },
            useInteractiveGuideline: true,
            xAxis: {
                axisLabel: '결산연도'
            },
            yAxis: {
                axisLabel: '가격(원)',
                tickFormat: function(d){
                    return d3.format(',.3r')(d);
                },
                axisLabelDistance: -10,
            },
            valueFormat: function(d){
                return d3.format(',.3r')(d);
            },
            forceY: [0, ],
        }
    };
    public valueOptions = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y / 100000000; },
            useInteractiveGuideline: true,
            xAxis: {
                axisLabel: '결산연도'
            },
            yAxis: {
                axisLabel: '가치(억)',
                tickFormat: function(d) {
                    return d3.format(',.3r')(d);
                },
                axisLabelDistance: -10,
            },
            valueFormat: function(d) {
                return d3.format(',.3r')(d);
            },
            forceY: [0, ],
        }
    };

    public croBar: any[];
    public roeBar: any[];
    public rosBar: any[];
    public wcpBar: any[];
    public priceLine: any[];
    public valueLine: any[];
  constructor(private itemService: ItemService,
          private analysisService: AnalysisService,
          private route: ActivatedRoute) { }



  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          this.key = params['key']; // (+) converts string 'id' to a number
          if(!this.key){
              return;
          }
          this.itemService.getItem(this.key).subscribe(res => {
              this.item = res;
          });
          this.analysisService.getFinance(this.key).subscribe(res => {
              this.noti = {
                  asset: res.results.find(x => x.finance_ckey === 100).tamt
                  , capital: res.results.find(x => x.finance_ckey === 300).tamt
                  , debit: res.results.find(x => x.finance_ckey === 200).tamt
                  , profit: res.results.find(x => x.finance_ckey === 601).tamt
                  , ebitda: res.results.find(x => x.finance_ckey === 606).tamt
                  , currency: res.results.find(x => x.finance_ckey === 100).currency
              };
          });
          this.analysisService.getAnaysis(this.key).subscribe(res => {
              this.drawDashBoard(res);
          });
      });
  }
  ngOnDestroy() {
      this.sub.unsubscribe();
  }
  drawDashBoard(res) {

      //2.재무요소
      //유동비
      this.cro = res.results.find(x => x.ckey === 313);
      this.cro.cal_key = '' + this.cro.cal_key;
      this.croBar = [
          {
              key: '유동비(유동자산/유동부채)',
              values: [
                  {
                      "label" : parseInt(this.cro.cal_key.substring(2, 4)) - 3 ,
                      "value" : this.cro.ppvalue
                  } ,
                  {
                      "label" : parseInt(this.cro.cal_key.substring(2, 4)) - 2 ,
                      "value" : this.cro.pvalue
                  } ,
                  {
                      "label" : parseInt(this.cro.cal_key.substring(2, 4)) - 1 ,
                      "value" : this.cro.tvalue
                  }
              ]
          }
      ];
      //자기자본순이익률(ROE)
      this.roe = res.results.find(x => x.ckey === 301);
      this.roe.cal_key = '' + this.roe.cal_key;
      this.roeBar = [
          {
              key: '자기자본순이익률(%)',
              values: [
                  {
                      "label" : parseInt(this.roe.cal_key.substring(2, 4)) - 3 ,
                      "value" : this.roe.ppvalue
                  } ,
                  {
                      "label" : parseInt(this.roe.cal_key.substring(2, 4)) - 2 ,
                      "value" : this.roe.pvalue
                  } ,
                  {
                      "label" : parseInt(this.roe.cal_key.substring(2, 4)) - 1 ,
                      "value" : this.roe.tvalue
                  }
              ]
          }
      ];
      //매출수익률(ROS)
      this.ros = res.results.find(x => x.ckey === 309);
      this.ros.cal_key = '' + this.ros.cal_key;
      this.rosBar = [
          {
              key: '매출수익률(%)',
              values: [
                  {
                      "label" : parseInt(this.ros.cal_key.substring(2, 4)) - 3 ,
                      "value" : this.ros.ppvalue
                  } ,
                  {
                      "label" : parseInt(this.ros.cal_key.substring(2, 4)) - 2 ,
                      "value" : this.ros.pvalue
                  } ,
                  {
                      "label" : parseInt(this.ros.cal_key.substring(2, 4)) - 1 ,
                      "value" : this.ros.tvalue
                  }
              ]
          }
      ];

      //운전자본
      this.wcp = res.results.find(x => x.ckey === 314);
      this.wcp.cal_key = '' + this.wcp.cal_key;
      this.wcpBar = [
          {
              key: '운전자본(억)',
              values: [
                  {
                      "label" : parseInt(this.wcp.cal_key.substring(2, 4)) - 3 ,
                      "value" : this.wcp.ppvalue
                  } ,
                  {
                      "label" : parseInt(this.wcp.cal_key.substring(2, 4)) - 2 ,
                      "value" : this.wcp.pvalue
                  } ,
                  {
                      "label" : parseInt(this.wcp.cal_key.substring(2, 4)) - 1 ,
                      "value" : this.wcp.tvalue
                  }
              ]
          }
      ];

      //3.가치요소
      this.bup = res.results.find(x => x.ckey === 403);
      this.bup.cal_key = '' + this.bup.cal_key;
      let bupLine = [];
      bupLine.push({x: parseInt(this.bup.cal_key.substring(2, 4)) - 3,
          y: parseInt(this.bup.ppvalue)
      });
      bupLine.push({x: parseInt(this.bup.cal_key.substring(2, 4)) - 2,
          y: parseInt(this.bup.pvalue)
      });
      bupLine.push({x: parseInt(this.bup.cal_key.substring(2, 4)) - 1,
          y: parseInt(this.bup.tvalue)
      });

      this.grp = res.results.find(x => x.ckey === 404);
      this.grp.cal_key = '' + this.grp.cal_key;
      let grpLine = [];
      grpLine.push({x: parseInt(this.grp.cal_key.substring(2, 4)) - 3,
          y: parseInt(this.grp.ppvalue)
      });
      grpLine.push({x: parseInt(this.grp.cal_key.substring(2, 4)) - 2,
          y: parseInt(this.grp.pvalue)
      });
      grpLine.push({x: parseInt(this.grp.cal_key.substring(2, 4)) - 1,
          y: parseInt(this.grp.tvalue)
      });

      this.crp = res.results.find(x => x.ckey === 405);
      this.crp.cal_key = '' + this.crp.cal_key;
      let crpLine = [];
      crpLine.push({x: parseInt(this.crp.cal_key.substring(2, 4)) - 3,
          y: parseInt(this.crp.ppvalue)
      });
      crpLine.push({x: parseInt(this.crp.cal_key.substring(2, 4)) - 2,
          y: parseInt(this.crp.pvalue)
      });
      crpLine.push({x: parseInt(this.crp.cal_key.substring(2, 4)) - 1,
          y: parseInt(this.crp.tvalue)
      });

      this.priceLine = [
          {
              values: bupLine,      //values - represents the array of {x,y} data points
              key: '적정주가(버핏)', //key  - the name of the series.
              color: '#ff6347'  //color - optional: Tomato
          },
          {
              values: grpLine,      //values - represents the array of {x,y} data points
              key: '적정주가(그레이엄, 7.2% 10년)', //key  - the name of the series.
              color: 'daa520' //color - optional: GoldenRod
          },
          {
              values: crpLine,      //values - represents the array of {x,y} data points
              key: '현재주가', //key  - the name of the series.
              color: '#00bfff'  //color - optional: DeepSkyBlue
          }
      ];

      this.bvp = res.results.find(x => x.ckey === 401);
      this.bvp.cal_key = '' + this.bvp.cal_key;
      let bvpLine = [];
      bvpLine.push({x: parseInt(this.bvp.cal_key.substring(2, 4)) - 3,
          y: parseInt(this.bvp.ppvalue)
      });
      bvpLine.push({x: parseInt(this.bvp.cal_key.substring(2, 4)) - 2,
          y: parseInt(this.bvp.pvalue)
      });
      bvpLine.push({x: parseInt(this.bvp.cal_key.substring(2, 4)) - 1,
          y: parseInt(this.bvp.tvalue)
      });
      this.gvp = res.results.find(x => x.ckey === 402);
      this.gvp.cal_key = '' + this.gvp.cal_key;
      let gvpLine = [];
      gvpLine.push({x: parseInt(this.gvp.cal_key.substring(2, 4)) - 3,
          y: parseInt(this.gvp.ppvalue)
      });
      gvpLine.push({x: parseInt(this.gvp.cal_key.substring(2, 4)) - 2,
          y: parseInt(this.gvp.pvalue)
      });
      gvpLine.push({x: parseInt(this.gvp.cal_key.substring(2, 4)) - 1,
          y: parseInt(this.gvp.tvalue)
      });

      this.valueLine = [
          {
              values: bvpLine,      //values - represents the array of {x,y} data points
              key: '내재가치(버핏)/억', //key  - the name of the series.
              color: '#ff6347'  //color - optional: Tomato
          },
          {
              values: gvpLine,      //values - represents the array of {x,y} data points
              key: '내재가치(그레이엄, 7.2% 10년)/억', //key  - the name of the series.
              color: 'daa520' //color - optional: GoldenRod
          }
      ];

    //1.기업요소
      if (res.results.find(x => x.value_ckey === 101)) {
           this.bizAnal = {'v101': res.results.find(x => x.value_ckey === 101).tvalue,
               'v102': res.results.find(x => x.value_ckey === 102).tvalue,
               'v103': res.results.find(x => x.value_ckey === 103).tvalue
           };
      }
   /* this.bizAnal = {'v101': res.results.find(x => x.value_ckey === 101).tvalue,
        'v102': res.results.find(x => x.value_ckey === 102).tvalue,
        'v103': res.results.find(x => x.value_ckey === 103).tvalue
    };
    */
  }
}
