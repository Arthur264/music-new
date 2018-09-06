import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {AccountService} from './account.service';
import {AppSettings} from '../app.settings';

@Injectable()
export class AppService {

    constructor(private http: Http, private accountService: AccountService) {
    }

    private getUrl(url) {
        return AppSettings.API_URL + url + '/';
    }

    private getHeaders() {
        let headers = new Headers({'Content-Type': 'application/json'});
        if (this.accountService.token) {
            headers.set('Authorization', 'Token ' + this.accountService.token);
        }
        return headers;
    }

    private getOptions() {
        return new RequestOptions({headers: this.getHeaders()});
    }

    public get(url, params = {}) {
        params['format'] = 'json';
        const options = this.getOptions();
        return this.http.get(this.getUrl(url), options)
            .map((res: Response) => res.json());

    }

    public post(url, body) {
        const options = this.getOptions();
        return this.http.post(this.getUrl(url), body, options)
            .map((res: Response) => res.json());
    }

    public delete(url) {
        const options = this.getOptions();
        return this.http.delete(this.getUrl(url), options)
            .map((res: Response) => res.json());
    }

    public put(url, body) {
        const options = this.getOptions();
        return this.http.put(this.getUrl(url), body, options)
            .map((res: Response) => res.json());
    }

    // public upload(url, body) {
    //     const headers = new Headers({ 'Authorization': 'Token ' + this.token, 'Accept': 'application/json' });
    //     const options = new RequestOptions({ headers: headers });
    //     return this.http.post(this.getUrl(url), body, options)
    //         .map((res: Response) => res.json());
    // }

}