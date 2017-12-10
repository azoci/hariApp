import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HistoryService {
    private _host: string;
    private _authToken: string;
    private _headers: HttpHeaders;
    private historyUrl = 'http://localhost:8000/';  // URL
    constructor(private _http: HttpClient) {}
    getTrades(): Observable<any> {
        const url = this.historyUrl + 'trade';
        return this._http.get<any>(url, httpOptions);
    }
    getEvents(): Observable<any> {
        const url = this.historyUrl + 'event';
        return this._http.get<any>(url, httpOptions);
    }
}
