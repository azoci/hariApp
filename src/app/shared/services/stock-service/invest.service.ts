import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class InvestService {
    private _host: string;
    private _authToken: string;
    private _headers: HttpHeaders;
    private investUrl = 'http://localhost:8000/invest/';  // URL
    constructor(private _http: HttpClient) {}
    getItem(): Observable<any> {
        const url = this.investUrl + 'item';
        return this._http.get<any>(url, httpOptions);
    }
    getAnaysis(): Observable<any> {
        const url = this.investUrl + 'analysis';
        return this._http.get<any>(url, httpOptions);
    }
}
