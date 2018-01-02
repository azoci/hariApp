import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HistoryService } from '../../../../shared/services/stock-service/history.service';
import {ItemService} from "../../../../shared/services/stock-service/item.service";

@Component({
    selector: 'app-trade',
    templateUrl: './trade.component.html',
    styleUrls: ['./trade.component.scss'],
    animations: [routerTransition()]
})
export class TradeComponent implements OnInit {
    public tradeForm: FormGroup;
    public query = '';
    public num = 0;
    public items: any;
    public visible = false;
    public message: any;
    constructor(private _fb: FormBuilder,
                private historyService: HistoryService,
                private itemService: ItemService
                ) {
        this.tradeForm = this._fb.group({
            dt: ['', <any>Validators.required],
            type_nm: ['', [<any>Validators.required]],
            item_key: ['', [<any>Validators.required]],
            cd: ['', [<any>Validators.required]],
            nm: ['', [<any>Validators.required]],
            num: ['', <any>Validators.required],
            price: ['', <any>Validators.required],
            amt: ['', <any>Validators.required],
            content: ['', <any>Validators.required],
            yn: ['Y', [<any>Validators.required]],
        });

    }
    ngOnInit() {
        this.itemService.getItems().subscribe(res => {
            this.items = res.results;
        });
        this.tradeForm.get('num').valueChanges.subscribe(x => {
            this.tradeForm.get('amt').setValue(this.tradeForm.get('price').value * x);
        });
        this.tradeForm.get('price').valueChanges.subscribe(x => {
            this.tradeForm.get('amt').setValue(this.tradeForm.get('num').value * x);
        });
        this.tradeForm.get('nm').valueChanges.subscribe(x => {
            this.query = x;
        });
    }
    save(data: any) {
      data.dt = data.dt.replace(new RegExp('-', 'g'), '');
      this.historyService.postTrade(data).subscribe(res => {
          this.visible = true;
          this.message = res;
          this.tradeForm.reset({
              yn: 'Y'
          });
        });
    }
    select(item) {
        (<FormControl>this.tradeForm.controls['nm'])
        .setValue(item.nm);
        (<FormControl>this.tradeForm.controls['item_key'])
        .setValue(item.url);
        (<FormControl>this.tradeForm.controls['cd'])
        .setValue(item.cd);
        (<FormControl>this.tradeForm.controls['yn'])
        .setValue(item.yn);
    }
    closeAlert() {
        this.visible = false;
    }
}
