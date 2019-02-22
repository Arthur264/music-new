import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AccountService} from './account.service';
import {AppSettings} from '../app.settings';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class AppService {

    constructor(private http: HttpClient,
                private accountService: AccountService,) {
    }

    public get(url, params = {}): Observable<any> {
        const options = this.getOptions(params);
        return this.http.get(this.getUrl(url), options);
    }

    public post(url, body): Observable<any> {
        const options = this.getOptions({}, body);
        return this.http.post(this.getUrl(url), body, options);
    }

    public delete(url, body = {}): Observable<any> {
        const options = this.getOptions({}, body);
        return this.http.delete(this.getUrl(url), options);
    }

    public put(url, body): Observable<any> {
        const options = this.getOptions({}, body);
        return this.http.put(this.getUrl(url), body, options);
    }

    public patch(url, body): Observable<any> {
        const options = this.getOptions({}, body);
        return this.http.patch(this.getUrl(url), body, options);
    }

    public getUrl(url) {
        return `${AppSettings.API_URL}${url}/`;
    }

    private getHeaders(req_headers = {}) {
        let headers = {
            'Content-Type': 'application/json',
        };
        if (this.accountService.token) {
            headers['Authorization'] = `Token ${this.accountService.token}`;
        }
        for (let prop in req_headers) {
            headers[prop] = req_headers[prop];
        }
        return new HttpHeaders(headers);
    }

    private getParams(req_params) {
        return new HttpParams({fromObject: {...req_params, 'format': 'json'}});
    }

    private getOptions(params = {}, body = {}, headers = {}) {
        let options = {headers: this.getHeaders(headers)};
        if (params) {
            options['params'] = this.getParams(params);
        }
        if (body) {
            options['body'] = body;
        }
        return options;
    }

    public uploadFormData(url, body: FormData) {
        const headers = {
            // 'Accept': 'application/json',
            'enctype': 'multipart/form-data',
        };
        const options = this.getOptions({}, body, headers);
        return this.http.post(this.getUrl(url), body, options);
    }
}