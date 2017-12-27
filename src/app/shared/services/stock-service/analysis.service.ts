import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AnalysisService {
    private _host: string;
    private _authToken: string;
    private _headers: HttpHeaders;
    private itemUrl = 'http://localhost:8000/analysis/';  // URL
    private params;
    constructor(private _http: HttpClient) {}
    getAnaysises(): Observable<any> {
        return this._http.get<any>(this.itemUrl, {headers: headers});
    }
    getAnaysis(key: string): Observable<any> {
        const url = this.itemUrl;
        this.params = new HttpParams().set('item_key', key).set('yn', 'Y');
        return this._http.get<any>(url, { headers: headers, params: this.params });
    }

}
