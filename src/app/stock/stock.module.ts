import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';

import { ItemComponent } from './list/components/item/item.component';

@NgModule({
  imports: [
      CommonModule,
      StockRoutingModule
  ],
  declarations: [
      ItemComponent
  ]
})
export class StockModule { }
