import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeComponent } from './components/trade/trade.component';
import { EventComponent } from './components/event/event.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TradeComponent, EventComponent]
})
export class HistoryModule { }
