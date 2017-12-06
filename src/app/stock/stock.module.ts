import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { StockRoutingModule } from './stock-routing.module';
import { MatTableModule } from '@angular/material';

import { ItemComponent } from './list/components/item/item.component';

@NgModule({
  imports: [
      CommonModule,
      StockRoutingModule,
      HttpClientModule,
      MatTableModule,
  ],
  declarations: [
      ItemComponent
  ]
})
export class StockModule { }
