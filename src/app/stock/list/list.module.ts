import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { TargetComponent } from './components/target/target.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItemComponent, TargetComponent]
})
export class ListModule { }
