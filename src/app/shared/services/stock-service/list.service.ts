import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ListService {
    private _host: string;
    private _authToken: string;
    private _headers: HttpHeaders;

    private itemUrl = 'http://localhost:8000/item/';  // UR
    constructor(private _http: HttpClient) {

    }

    getItems(): Observable<any> {
        return this._http.get<any>(this.itemUrl, httpOptions);
    }

    getItem(i: string): Observable<any> {
        let url = this.itemUrl + i;
        return this._http.get<any>(url, httpOptions);
    }
}
