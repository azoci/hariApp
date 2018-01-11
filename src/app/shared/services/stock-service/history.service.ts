import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HistoryService {
    private _host: string;
    private _authToken: string;
    private _headers: HttpHeaders;
    private historyUrl = environment.url;  // URL
    constructor(private _http: HttpClient) {}
    getTrades(): Observable<any> {
        const url = this.historyUrl + 'trade';
        return this._http.get<any>(url, httpOptions);
    }
    getEvents(): Observable<any> {
        const url = this.historyUrl + 'event';
        return this._http.get<any>(url, httpOptions);
    }
    postTrade(body: any): Observable<any> {
        const url = this.historyUrl + 'trade/';
        return this._http.post(url, JSON.stringify(body), httpOptions);
    }
    putTrade(body: any): Observable<any> {
        const url = this.historyUrl + 'trade/' + body.key + '/';
        return this._http.put(url, JSON.stringify(body), httpOptions);
    }
    deleteTrade(body: any): Observable<any> {
        const url = this.historyUrl + 'trade/' + body.key + '/';
        return this._http.delete(url, httpOptions);
    }
    postEvent(body: any): Observable<any> {
        const url = this.historyUrl + 'event/';
        return this._http.post(url, JSON.stringify(body), httpOptions);
    }
    putEvent(body: any): Observable<any> {
        const url = this.historyUrl + 'event/'+ body.key + '/';
        return this._http.put(url, JSON.stringify(body), httpOptions);
    }
    deleteEvent(body: any): Observable<any> {
        const url = this.historyUrl + 'event/' + body.key + '/';
        return this._http.delete(url, httpOptions);
    }
}
