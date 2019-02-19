import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export class SearchService {
    private _subject = new Subject<string>();

    constructor() {
    }

    public setValue(value: string) {
        this._subject.next(value);
    }


    public getSearch(): Observable<any> {
        return this._subject.asObservable();
    }
}
