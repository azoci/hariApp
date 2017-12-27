import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './list/components/item/item.component';
import { EachComponent } from './dashboard/components/each/each.component';
import { TotalComponent } from './dashboard/components/total/total.component';
import { TradeComponent } from './history/components/trade/trade.component';
import { EventComponent } from './history/components/event/event.component';
const routes: Routes = [
    { path: '', component: ItemComponent},
    { path: 'item', component: ItemComponent},
    { path: 'each', component: EachComponent},
    { path: 'each/:key', component: EachComponent},
    { path: 'total', component: TotalComponent},
    { path: 'trade', component: TradeComponent},
    { path: 'event', component: EventComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
