import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {ItemService} from '../../../../shared/services/stock-service/item.service';
import { HistoryService } from '../../../../shared/services/stock-service/history.service';
import { MatPaginator, MatTableDataSource, MatSort  } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    selector: 'app-trade',
    templateUrl: './trade.component.html',
    styleUrls: ['./trade.component.scss'],
    animations: [routerTransition()]
})
export class TradeComponent implements OnInit {
    @ViewChild(MatSort) tradeSort: MatSort;
    @ViewChild(MatPaginator) tradePaginator: MatPaginator;
    public tradeForm: FormGroup;
    public query = '';
    public num = 0;
    public items: any;
    public visible = false;
    public message: any;
    public tradeColumns = ['select', 'dt', 'type_nm', 'nm', 'num', 'price', 'amt', 'content'];
    public tradeDS: any;
    public selection = new SelectionModel<Trade>(true, []);
    public status = 'Create';

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
            key: ['', [<any>Validators.required]]
        });

    }
    ngOnInit() {
        this.historyService.getTrades().subscribe(res => {
            this.tradeDS = new MatTableDataSource<Trade>(res.results);
            this.tradeDS.sort = this.tradeSort;
            this.tradeDS.paginator = this.tradePaginator;
        });
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
      if (this.status === 'Create') {
          this.historyService.postTrade(data).subscribe(res => {
              this.visible = true;
              this.message = res;
              this.tradeForm.reset({
                  yn: 'Y'
              });
              this.status = 'Create';
              this.historyService.getTrades().subscribe(res1 => {
                  this.tradeDS = new MatTableDataSource<Trade>(res1.results);
                  this.tradeDS.sort = this.tradeSort;
                  this.tradeDS.paginator = this.tradePaginator;
                  this.selection.clear();
              });
          });
      } else {
          this.historyService.putTrade(data).subscribe(res => {
              this.visible = true;
              this.message = res;
              this.tradeForm.reset({
                  yn: 'Y'
              });
              this.status = 'Create';
              this.historyService.getTrades().subscribe(res1 => {
                  this.tradeDS = new MatTableDataSource<Trade>(res1.results);
                  this.tradeDS.sort = this.tradeSort;
                  this.tradeDS.paginator = this.tradePaginator;
                  this.selection.clear();
              });
          });
      }
    }
    reset() {
        this.status = 'Create';
    }
    delete() {
        if (this.selection.hasValue()) {
            this.historyService.deleteTrade(this.selection.selected[0]).subscribe(res => {
                this.historyService.getTrades().subscribe(res1 => {
                    this.tradeDS = new MatTableDataSource<Trade>(res1.results);
                    this.tradeDS.sort = this.tradeSort;
                    this.tradeDS.paginator = this.tradePaginator;
                    this.selection.clear();
                });
            });
        }
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
    handleRowClick(row) {
        this.selection.toggle(row);
        this.tradeForm.setValue({
            dt: row.dt.substr(0 , 4) + '-' + row.dt.substr(4 , 2) + '-' + row.dt.substr(6 , 2),
            type_nm: row.type_nm,
            item_key: row.item_key,
            cd: row.cd,
            nm: row.nm,
            num: row.num,
            price: row.price,
            amt: row.amt,
            content: row.content,
            yn: 'Y',
            key: row.key
        });
        this.status = 'Update';
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.tradeDS.data.length;
        return numSelected === numRows;
    }
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.tradeDS.data.forEach(row => this.selection.select(row));
    }
}

export interface Trade {
    dt: string;
    type_nm: string;
    nm: string;
    num: number;
    price: number;
    amt: number;
    content: string;
}
