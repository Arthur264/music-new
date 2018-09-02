import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {AlertInterface} from '../_interfaces/alert.interface';

@Injectable()
export class AlertService {
    private _subject = new Subject<any>();
    private _keepAfterNavigationChange = false;
    public alert: AlertInterface;

    constructor() {
    }

    private _make_alert(keepAfterNavigationChange = false) {
        this._keepAfterNavigationChange = keepAfterNavigationChange;
        this._subject.next(this.alert);
    }

    public success(message: string, keepAfterNavigationChange = false) {
        this.alert = {message: message, type: 'success'};
        this._make_alert(keepAfterNavigationChange);
    }

    public error(message: string, keepAfterNavigationChange = false) {
        this.alert = {message: message, type: 'error'};
        console.log(this.alert)
        this._make_alert(keepAfterNavigationChange);
    }

    public denger(message: string, keepAfterNavigationChange = false) {
        this.alert = {message: message, type: 'denger'};
        this._make_alert(keepAfterNavigationChange);
    }

    public getAlert(): Observable<any> {
        return this._subject.asObservable();
    }

}
