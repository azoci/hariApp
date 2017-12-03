import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EachComponent } from './components/each/each.component';
import { TotalComponent } from './components/total/total.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EachComponent, TotalComponent]
})
export class DashboardModule { }
