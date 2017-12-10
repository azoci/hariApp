import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { StockRoutingModule } from './stock-routing.module';
import { MatTableModule } from '@angular/material';

import { ItemComponent } from './list/components/item/item.component';
import { EachComponent } from './dashboard/components/each/each.component';
import { TotalComponent } from './dashboard/components/total/total.component';
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
  ],
  declarations: [
      ItemComponent,
      EachComponent,
      TotalComponent,
  ]
})
export class StockModule { }
