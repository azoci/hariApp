import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { StockRoutingModule } from './stock-routing.module';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSelectModule, MatCheckboxModule } from '@angular/material';
import { SharedPipesModule } from './../shared/pipes/shared-pipes.module';

import { ItemComponent } from './list/components/item/item.component';
import { EachComponent } from './dashboard/components/each/each.component';
import { TotalComponent } from './dashboard/components/total/total.component';
import { EventComponent } from './history/components/event/event.component';
import { TradeComponent } from './history/components/trade/trade.component';
import { PageHeaderModule } from './../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NvD3Module } from 'ng2-nvd3';

// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';

@NgModule({
  imports: [
      CommonModule,
      StockRoutingModule,
      HttpClientModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      PageHeaderModule,
      Ng2Charts,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatCheckboxModule,
      FormsModule,
      ReactiveFormsModule,
      SharedPipesModule,
      NvD3Module,
      NgbModule.forRoot(),
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
