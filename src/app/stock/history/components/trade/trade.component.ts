import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';

@Component({
    selector: 'app-trade',
    templateUrl: './trade.component.html',
    styleUrls: ['./trade.component.scss'],
    animations: [routerTransition()]
})
export class TradeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
