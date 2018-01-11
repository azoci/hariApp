import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


@Injectable()
export class AnalysisService {
    private _host: string;
    private _authToken: string;
    private _headers: HttpHeaders;
    private params;
    constructor(private _http: HttpClient) {}
    getAnaysises(): Observable<any> {
        const url = environment.url + 'analysis/';
        return this._http.get<any>(url, {headers: headers});
    }
    getAnaysis(key: string): Observable<any> {
        const url = environment.url + 'analysis/';
        this.params = new HttpParams().set('item_key', key).set('yn', 'Y');
        return this._http.get<any>(url, { headers: headers, params: this.params });
    }
    getFinance(key: string): Observable<any> {
        const url = environment.url + 'noticefact/';
        this.params = new HttpParams().set('item_key', key);
        return this._http.get<any>(url, { headers: headers, params: this.params });
    }
}
