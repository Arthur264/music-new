import {Injectable} from '@angular/core';
import {AppService} from './app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';


@Injectable()
export class CacheService {
    private _cache$ = {};
    private _cacheObservable: { [s: string]: Observable<any> } = {};

    constructor(private appService: AppService) {
    }

    public get(url, items = 'items'): Observable<any> {
        return this._make_request(url, items);
    }

    public clearCache(param_key?: string) {
        if (param_key) {
            this._cache$[param_key] = null;
            this._cacheObservable[param_key] = null;
        } else {
            this._cache$ = null;
            this._cacheObservable = null;
        }
    }

    private _make_request(url, items = 'items', cache = false) {
        if (cache) {
            this.clearCache(url);
        }
        if (this._cache$.hasOwnProperty(url)) {
            return Observable.of(this._cache$[url]);
        } else if (this._cacheObservable.hasOwnProperty(url)) {
            return this._cacheObservable[url];
        } else {
            this._cacheObservable[url] = this.appService.get(url)
                .map(res => {
                    this._cache$[url] = res[items];
                    return this._cache$[url];
                }).share();
            return this._cacheObservable[url];
        }
    }

}
