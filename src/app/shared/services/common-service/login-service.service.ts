import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginServiceService {
    private _host: string;
    private _authToken: string;
    private _headers: HttpHeaders;
    constructor(private _http: HttpClient) {}
    postLogin(body: any): Observable<any> {
        const url = environment.url + 'api-token-auth/';
        return this._http.post(url, JSON.stringify(body), httpOptions);

    }
    /*
    postLogOut(body: any): Observable<any> {
        const url = this.historyUrl + 'api-token-auth/';
        return this._http.post(url, JSON.stringify(body), httpOptions);
    }
    */
}
