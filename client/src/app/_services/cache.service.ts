import {Injectable} from '@angular/core';
import {AppService} from './app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class CacheService {
    private _cache$;
    private _cacheObservable: Observable<any>;

    constructor(private appService: AppService) {
    }

    public get(url, items = 'items'): Observable<any> {
        return this._make_request(url, items);
    }

    public clearCache() {
        this._cache$ = null;
        this._cacheObservable = null;
    }

    private _make_request(url, items = 'items') {
        if (this._cache$) {
            return Observable.of(this._cache$);
        } else if (this._cacheObservable) {
            return this._cacheObservable;
        } else {
            this._cacheObservable = this.appService.get(url)
                .map(res => {
                    this._cache$ = res[items];
                    return this._cache$;
                }).share();
            return this._cacheObservable;
        }
    }

}
