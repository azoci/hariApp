import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.length > 0) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Token ${localStorage.getItem('Token')}`
                }
            });
        }
        return next.handle(req);
    }
}
