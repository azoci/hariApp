import { Component, OnInit } from '@angular/core';
import { ListService} from '../../../../shared/services/stock-service/list.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(private service: ListService) { }

  ngOnInit() {
      this.service.getItems().subscribe();
  }

}
