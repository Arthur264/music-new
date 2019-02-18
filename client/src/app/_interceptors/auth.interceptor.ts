import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AccountService} from '../_services/account.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).do(
            (event: HttpEvent<any>) => {
                return event;
            },
            (err: HttpErrorResponse) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.accountService.logout();
                    }
                }
                return Observable.throw(err)
            });
    }
}