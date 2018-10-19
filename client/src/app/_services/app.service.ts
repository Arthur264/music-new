import {Injectable} from '@angular/core';
import {
    Headers,
    Http,
    RequestOptions,
    Response,
    URLSearchParams,
} from '@angular/http';
import 'rxjs/add/operator/map';
import {AccountService} from './account.service';
import {AppSettings} from '../app.settings';

@Injectable()
export class AppService {

    constructor(private http: Http, private accountService: AccountService) {
    }

    public get(url, params = {}) {
        const options = this.getOptions(params);
        return this.http.get(this.getUrl(url), options)
            .map((res: Response) => res.json());

    }

    public post(url, body) {
        const options = this.getOptions({}, body);
        return this.http.post(this.getUrl(url), body, options)
            .map((res: Response) => res.json());
    }

    public delete(url, body = {}) {
        const options = this.getOptions({}, body);
        return this.http.delete(this.getUrl(url), options)
            .map((res: Response) => res.json());
    }

    public put(url, body) {
        const options = this.getOptions();
        return this.http.put(this.getUrl(url), body, options)
            .map((res: Response) => res.json());
    }

    private getUrl(url) {
        return `${AppSettings.API_URL}${url}/`;
    }

    private getHeaders() {
        let headers = new Headers({'Content-Type': 'application/json'});
        if (this.accountService.token) {
            headers.set('Authorization', 'Token ' + this.accountService.token);
        }
        return headers;
    }

    private getParams(req_params) {
        let params = new URLSearchParams();
        params.append('format', 'json');
        for (const prop in req_params) {
            params.append(String(prop), req_params[prop]);
        }
        return params;
    }

    private getOptions(params = {}, body = {}) {
        let options = {headers: this.getHeaders()};
        if (params) {
            options['params'] = this.getParams(params)
        }
        if (body) {
            options['body'] = body
        }
        return new RequestOptions(options);
    }
}