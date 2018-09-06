import {Injectable} from '@angular/core';
import {AppService} from './app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class PlaylistService {
    private cache$;
    private cacheObservable: Observable<any>;

    constructor(private appService: AppService) {
    }

    public playlist(): Observable<any> {
        if (this.cache$) {
            return Observable.of(this.cache$);
        } else if (this.cacheObservable) {
            return this.cacheObservable;
        } else {
            this.cacheObservable = this.appService.get('playlist')
                .map(res => {
                    this.cache$ = res.items;
                    return this.cache$;
                }).share();
            return this.cacheObservable;
        }
    }

}
