import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()
export class ItemService {
    private _host: string;
    private _authToken: string;
    private _headers: HttpHeaders;
    private itemUrl = 'http://localhost:8000/item/';  // URL
    private params;
    constructor(private _http: HttpClient) {}
    getItems(): Observable<any> {
        this.params = new HttpParams().set('yn', 'Y');
        console.log(this.params);
        return this._http.get<any>(this.itemUrl, {headers: headers, params: this.params});
    }
    getItem(key: string): Observable<any> {
        const url = this.itemUrl + key;
        return this._http.get<any>(url, { headers: headers});
    }
}
