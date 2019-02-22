import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export class SearchService {
    private _subject = new Subject<string>();
    private _turn_subject = new Subject<boolean>();

    constructor() {
    }

    public setValue(value: string) {
        this._subject.next(value);
    }


    public getSearch(): Observable<string> {
        return this._subject.asObservable();
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
