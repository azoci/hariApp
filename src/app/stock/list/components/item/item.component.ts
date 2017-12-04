import { Component, OnInit } from '@angular/core';
import { ListService} from '../../../../shared/services/stock-service/list.service';
import { routerTransition } from '../../../../router.animations';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    animations: [routerTransition()]
})
export class ItemComponent implements OnInit {

  constructor(private service: ListService) { }

  ngOnInit() {
      this.service.getItems().subscribe(res => console.log(res));
  }

}
