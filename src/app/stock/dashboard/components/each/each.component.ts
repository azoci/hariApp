import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { ItemService } from '../../../../shared/services/stock-service/item.service';
import { AnalysisService } from '../../../../shared/services/stock-service/analysis.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-each',
  templateUrl: './each.component.html',
  styleUrls: ['./each.component.scss'],
  animations: [routerTransition()]
})
export class EachComponent implements OnInit, OnDestroy {

    private sub;
    private key;
    public item;
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

    //bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        '`16',
        '`15',
        '`14'
    ];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    // lineChart
    public lineChartLabels: string[] = [
        '`16',
        '`15',
        '`14'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: any[] = [
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
            backgroundColor: 'rgba(148,159,100,0.2)',
            borderColor: 'rgba(148,159,100,1)',
            pointBackgroundColor: 'rgba(148,159,100,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,100,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    public croBar: any[] = [{data: [0, 0, 0]}];
    public roeBar: any[] = [{data: [0, 0, 0]}];
    public rosBar: any[] = [{data: [0, 0, 0]}];
    public wcpBar: any[] = [{data: [0, 0, 0]}];
    public priceLine: any[] = [{data: [0, 0, 0]},{data: [0, 0, 0]},{data: [0, 0, 0]}];
    public valueLine: any[] = [{data: [0, 0, 0]},{data: [0, 0, 0]}];

  constructor(private itemService: ItemService,
          private analysisService: AnalysisService,
          private route: ActivatedRoute) { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          this.key = params['key']; // (+) converts string 'id' to a number
          console.log(this.key);
          this.itemService.getItem(this.key).subscribe(res => {
              this.item = res;
          });
          this.analysisService.getAnaysis(this.key).subscribe(res => {
              console.log(res);
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
      let ar = res.results.find(x => x.value_ckey === 'http://localhost:8000/value/313/');
      this.cro = [ar.tvalue, ar.pvalue, ar.ppvalue];
      this.croBar = [
          { data: this.cro, label: '유동비(유동자산/유동부채)' }
      ];
      //자기자본순이익률(ROE)
      ar = res.results.find(x => x.value_ckey === 'http://localhost:8000/value/301/');
      this.roe = [ar.tvalue, ar.pvalue, ar.ppvalue];
      this.roeBar = [
          { data: this.roe, label: '자기자본순이익률(%)' }
      ];
      //매출수익률(ROS)
      ar = res.results.find(x => x.value_ckey === 'http://localhost:8000/value/313/');
      this.ros = [ar.tvalue, ar.pvalue, ar.ppvalue];
      this.rosBar = [
          { data: this.ros, label: '매출수익률(%)' }
      ];
      //운전자본
      ar = res.results.find(x => x.value_ckey === 'http://localhost:8000/value/314/');
      this.wcp = [Math.round(ar.tvalue/100000000), Math.round(ar.pvalue/100000000), Math.round(ar.ppvalue/100000000)];
      this.wcpBar = [
          { data: this.wcp, label: '운전자본(억)' }
      ];

      //3.가치요소
      ar = res.results.find(x => x.value_ckey === 'http://localhost:8000/value/403/');
      this.bup = [ar.tvalue, ar.pvalue, ar.ppvalue];
      ar = res.results.find(x => x.value_ckey === 'http://localhost:8000/value/404/');
      this.grp = [ar.tvalue, ar.pvalue, ar.ppvalue];
      ar = res.results.find(x => x.value_ckey === 'http://localhost:8000/value/405/');
      this.crp = [ar.tvalue, ar.pvalue, ar.ppvalue];
      this.priceLine = [
          { data: this.bup, label: '적정주가(버핏)' },
          { data: this.grp, label: '적정주가(그레이엄, 7.2% 10년)' },
          { data: this.crp, label: '현재주가' }
      ];
      ar = res.results.find(x => x.value_ckey === 'http://localhost:8000/value/401/');
      this.bvp = [Math.round(ar.tvalue/100000000), Math.round(ar.pvalue/100000000), Math.round(ar.ppvalue/100000000)];
      ar = res.results.find(x => x.value_ckey === 'http://localhost:8000/value/402/');
      this.gvp = [Math.round(ar.tvalue/100000000), Math.round(ar.pvalue/100000000), Math.round(ar.ppvalue/100000000)];
      this.valueLine = [
          { data: this.bvp, label: '내재가치(버핏)/억' },
          { data: this.gvp, label: '내재가치(그레이엄, 7.2% 10년)/억' }
      ];

      //1.기업요소
      this.bizAnal = {'v101': res.results.find(x => x.value_ckey === 'http://localhost:8000/value/101/').tvalue,
          'v102': res.results.find(x => x.value_ckey === 'http://localhost:8000/value/102/').tvalue,
          'v103': res.results.find(x => x.value_ckey === 'http://localhost:8000/value/103/').tvalue
      };
  }
}
