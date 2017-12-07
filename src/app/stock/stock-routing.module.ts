import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemComponent} from './list/components/item/item.component';
import {EachComponent} from './dashboard/components/each/each.component';

const routes: Routes = [
    { path: '', component: ItemComponent},
    { path: 'item', component: ItemComponent},
    { path: 'each', component: EachComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
