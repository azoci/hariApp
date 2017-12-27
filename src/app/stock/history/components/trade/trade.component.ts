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
    public items: any;
    public visible = true;
    constructor(private _fb: FormBuilder,
                private historyService: HistoryService,
                private itemService: ItemService
                ) {
        this.tradeForm = this._fb.group({
            dt: ['', <any>Validators.required],
            type_nm: ['', [<any>Validators.required]],
            item_key: ['', [<any>Validators.required]],
            nm: ['', [<any>Validators.required]],
            num: ['', <any>Validators.required],
            price: ['', <any>Validators.required],
            amt: ['', <any>Validators.required],
            content: ['', <any>Validators.required]
        });

    }
    ngOnInit() {
        this.itemService.getItems().subscribe(res => {
            this.items = res.results;
            console.log(this.items);
        });
    }
    save(data: any) {
      data.dt = data.dt.replace(new RegExp('-', 'g'), '');
      console.log(data);
      this.historyService.postTrade(data).subscribe(res => console.log(res));
    }
    select(item) {
        (<FormControl>this.tradeForm.controls['nm'])
        .setValue(item.nm);
        (<FormControl>this.tradeForm.controls['item_key'])
        .setValue(item.url);
        this.visible = false;
    }

}
