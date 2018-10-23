import {Injectable} from '@angular/core';
import {SongInterface} from '../_interfaces';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class PlayerService {
    private _currentSong: Subject<SongInterface> = new Subject();
    private _arraySong: Subject<SongInterface[]> = new Subject();

    constructor() {
    }


    public emitChangeSong(obj: SongInterface) {
        this._currentSong.next(obj);
    }

    public getSong(): Observable<any> {
        return this._currentSong.asObservable();
    }

    public emitArrayMusic(obj: SongInterface[]) {
        this._arraySong.next(obj);
    }

    public getArrayMusic(): Observable<any> {
        return this._arraySong.asObservable();
    }

}
