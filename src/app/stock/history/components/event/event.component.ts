import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HistoryService } from '../../../../shared/services/stock-service/history.service';
import { MatPaginator, MatTableDataSource, MatSort  } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
    animations: [routerTransition()]
})
export class EventComponent implements OnInit {
    @ViewChild(MatSort) eventSort: MatSort;
    @ViewChild(MatPaginator) eventPaginator: MatPaginator;
    public eventForm: FormGroup;
    public visible = false;
    public message: any;
    public eventColumns = ['select', 'dt', 'nm', 'prate', 'drate', 'content'];
    public eventDS: any;
    public selection = new SelectionModel<Event>(true, []);
    public status = 'Create';

    constructor(private _fb: FormBuilder, private service: HistoryService) {
      this.eventForm = this._fb.group({
          dt: ['', <any>Validators.required],
          nm: ['', [<any>Validators.required]],
          prate: ['', <any>Validators.required],
          drate: ['', <any>Validators.required],
          content: ['', <any>Validators.required],
          key: ['', <any>Validators.required]
      });

    }
    ngOnInit() {
        this.service.getEvents().subscribe(res => {
            this.eventDS = new MatTableDataSource<Event>(res.results);
            this.eventDS.paginator = this.eventPaginator;
        });
    }
    save(data: any) {
      data.dt = data.dt.replace(new RegExp('-', 'g'), '');
        if (this.status === 'Create') {
            this.service.postEvent(data).subscribe(res => {
                this.visible = true;
                this.message = res;
                this.eventForm.reset();
                this.status = 'Create';
                this.service.getEvents().subscribe(res1 => {
                    this.eventDS = new MatTableDataSource<Event>(res1.results);
                    this.eventDS.paginator = this.eventPaginator;
                    this.selection.clear();
                });
            });
        } else {
            this.service.putEvent(data).subscribe(res => {
                this.visible = true;
                this.message = res;
                this.eventForm.reset();
                this.status = 'Create';
                this.service.getEvents().subscribe(res1 => {
                    this.eventDS = new MatTableDataSource<Event>(res1.results);
                    this.eventDS.paginator = this.eventPaginator;
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
            this.service.deleteEvent(this.selection.selected[0]).subscribe(res => {
                this.service.getEvents().subscribe(res1 => {
                    this.eventDS = new MatTableDataSource<Event>(res1.results);
                    this.eventDS.sort = this.eventSort;
                    this.eventDS.paginator = this.eventPaginator;
                    this.selection.clear();
                });
            });
        }
    }
    closeAlert() {
        this.visible = false;
    }
    handleRowClick(row) {
        this.selection.toggle(row);
        this.eventForm.setValue({
            dt: row.dt.substr(0 , 4) + '-' + row.dt.substr(4 , 2) + '-' + row.dt.substr(6 , 2),
            nm: row.nm,
            prate: row.prate,
            drate: row.drate,
            content: row.content,
            key: row.key
        });
        this.status = 'Update';
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.eventDS.data.length;
        return numSelected === numRows;
    }
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.eventDS.data.forEach(row => this.selection.select(row));
    }
}

export interface Event {
    dt: string;
    nm: string;
    prate: number;
    drate: number;
    content: string;

}
