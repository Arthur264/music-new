import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {AlertInterface} from '../_interfaces';

@Injectable()
export class AlertService {
    private _subject = new Subject<AlertInterface>();
    private _keepAfterNavigationChange = false;
    public alert: AlertInterface;

    constructor() {
    }

    private _make_alert(keepAfterNavigationChange = false) {
        this._keepAfterNavigationChange = keepAfterNavigationChange;
        this._subject.next(this.alert);
    }

    public success(message: string, keepAfterNavigationChange = false) {
        this.alert = {message: 'Success: ' + message, type: 'success'};
        this._make_alert(keepAfterNavigationChange);
    }

    public error(message: string, keepAfterNavigationChange = false) {
        console.log('error', message);
        this.alert = {message: 'Error: ' + message, type: 'error'};
        this._make_alert(keepAfterNavigationChange);
    }

    public denger(message: string, keepAfterNavigationChange = false) {
        this.alert = {message: 'Danger: ' + message, type: 'denger'};
        this._make_alert(keepAfterNavigationChange);
    }

    public getAlert(): Observable<any> {
        return this._subject.asObservable();
    }
}
