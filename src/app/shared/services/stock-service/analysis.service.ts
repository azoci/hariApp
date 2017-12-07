import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AnalysisService {
    private _host: string;
    private _authToken: string;
    private _headers: HttpHeaders;
    private itemUrl = 'http://localhost:8000/analysis/';  // URL
    constructor(private _http: HttpClient) {}
    getAnaysises(): Observable<any> {
        return this._http.get<any>(this.itemUrl, httpOptions);
    }
    getAnaysis(i: string): Observable<any> {
        const url = this.itemUrl + '?item_key=' + i;
        return this._http.get<any>(url, httpOptions);
    }
}
