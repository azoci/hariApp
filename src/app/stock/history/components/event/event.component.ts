import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HistoryService } from '../../../../shared/services/stock-service/history.service';


@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
    animations: [routerTransition()]
})
export class EventComponent implements OnInit {

    public eventForm: FormGroup;
  constructor(private _fb: FormBuilder, private service: HistoryService) {
      this.eventForm = this._fb.group({
          dt: ['', <any>Validators.required],
          nm: ['', [<any>Validators.required]],
          rate: ['', <any>Validators.required],
          content: ['', <any>Validators.required]
      });

  }

  ngOnInit() {
  }
  save(data: any) {
      data.dt = data.dt.replace(new RegExp('-', 'g'), '');
      this.service.postEvent(data).subscribe(res => console.log(res));
  }
}
