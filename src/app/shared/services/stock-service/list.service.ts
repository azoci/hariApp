import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

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
        this._headers = httpOptions.headers.set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', '*');
    }

    getItems(): Observable<any[]> {
        return this._http.get<any[]>(this.itemUrl);
    }

}
