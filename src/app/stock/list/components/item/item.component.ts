import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { ItemService} from '../../../../shared/services/stock-service/item.service';
import { routerTransition } from '../../../../router.animations';
import { Router } from '@angular/router';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    animations: [routerTransition()]
})
export class ItemComponent implements OnInit {

    displayedColumns = ['mrktm', 'nm', 'cd', 'biznm', 'cbizm', 'pros', 'cons', 'eqcap'];
    dataSource: any;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(private service: ItemService,
                private router: Router) {}
    ngOnInit() {
        this.service.getItems().subscribe(res => {
            this.dataSource = new MatTableDataSource<Element>(res.results);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    handleRowClick(row) {
        console.log(row.key);
        this.router.navigate(['/stock/each', row.key]);
    }
}
export interface Element {
    mrktm: string;
    nm: string;
    cd: string;
    biznm: string;
    cbizm: string;
    pros: string;
    cons: string;
    eqcap: number;
}

