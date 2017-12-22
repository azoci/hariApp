import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { StockRoutingModule } from './stock-routing.module';
import { MatTableModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

import { ItemComponent } from './list/components/item/item.component';
import { EachComponent } from './dashboard/components/each/each.component';
import { TotalComponent } from './dashboard/components/total/total.component';
import { EventComponent } from './history/components/event/event.component';
import { TradeComponent } from './history/components/trade/trade.component';
import { PageHeaderModule } from './../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
  imports: [
      CommonModule,
      StockRoutingModule,
      HttpClientModule,
      MatTableModule,
      PageHeaderModule,
      Ng2Charts,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
  ],
  declarations: [
      ItemComponent,
      EachComponent,
      TotalComponent,
      EventComponent,
      TradeComponent,
  ]
})
export class StockModule { }
