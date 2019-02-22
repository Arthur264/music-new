import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ApiRouting} from '../api.routing';
import {AppService} from './app.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SearchService {
    private _subject = new Subject<string>();
    private _turn_subject = new Subject<boolean>();

    constructor(private appService: AppService) {
    }

    public setValue(value: string) {
        this._subject.next(value);
    }


    public getSearch(): Observable<string> {
        return this._subject.asObservable();
    }

    public search(searchValue: string, type: string = 'song'): Observable<any> {
        return this.appService.get(ApiRouting.search, {
            'q': searchValue,
            'type': type,
        });
    }

    public turnOn() {
        this._turn_subject.next(true);
    }

    public turnOff() {
        this._turn_subject.next(false);
        this.setValue('');
    }

    public getTurn(): Observable<boolean> {
        return this._turn_subject.asObservable();
    }
}
