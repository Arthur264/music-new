import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ConfirmService {
    private _subject = new Subject<boolean>();
    private _subjectOpen = new Subject<boolean>();

    public changeStatus(status: boolean) {
        this._subject.next(status);
    }

    public open() {
        this._subjectOpen.next(true);
    }

    public eventOpen(){
        return this._subjectOpen.asObservable();
    }
}
