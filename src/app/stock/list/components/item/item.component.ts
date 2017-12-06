import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import { ListService} from '../../../../shared/services/stock-service/list.service';
import { routerTransition } from '../../../../router.animations';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    animations: [routerTransition()]
})
export class ItemComponent implements OnInit {

    displayedColumns = ['nm', 'cd', 'biznm', 'cbizm', 'pros', 'cons', 'eqcap'];
    dataSource: any;
    constructor(private service: ListService) {}
    ngOnInit() {
        this.service.getItems().subscribe(res => {
            this.dataSource = new MatTableDataSource<Element>(res.results);
        });
    }
}
export interface Element {
    nm: string;
    cd: string;
    biznm: string;
    cbizm: string;
    pros: string;
    cons: string;
    eqcap: number;
}

