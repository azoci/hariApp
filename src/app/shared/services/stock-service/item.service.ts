import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()
export class ItemService {
    private _host: string;
    private _authToken: string;
    public _headers: HttpHeaders;
    private params;
    constructor(private _http: HttpClient) {}
    getItems(): Observable<any> {
        this._headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.params = new HttpParams().set('yn', 'Y');
        const url = environment.url + 'item/';
        return this._http.get<any>(url, {headers: this._headers, params: this.params});
    }
    getItem(key: string): Observable<any> {
        const url = environment.url + 'item/' + key;
        return this._http.get<any>(url, { headers: headers});
    }
}
