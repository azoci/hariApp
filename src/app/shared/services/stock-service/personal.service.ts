import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PersonalService {
    private _host: string;
    private _authToken: string;
    private _headers: HttpHeaders;
    constructor(private _http: HttpClient) {}
    getItems(): Observable<any> {
        const url = environment.url + 'personal/item';
        return this._http.get<any>(url, httpOptions);
    }
    getAnaysises(): Observable<any> {
        const url = environment.url + 'personal/analysis';
        return this._http.get<any>(url, httpOptions);
    }
}
