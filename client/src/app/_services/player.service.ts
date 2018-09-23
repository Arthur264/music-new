import {EventEmitter, Injectable} from '@angular/core';
import {SongInterface} from '../_interfaces';

@Injectable()
export class PlayerService {
    currentSong: EventEmitter<SongInterface> = new EventEmitter();
    arrayMusic: EventEmitter<SongInterface[]> = new EventEmitter();

    constructor() {
    }

    public emitChangeSong(obj: SongInterface) {
        this.currentSong.emit(obj);
    }

    public getSong() {
        return this.currentSong;
    }

    public emitArrayMusic(obj: SongInterface[]) {
        this.arrayMusic.emit(obj);
    }

    public getArrayMusic() {
        return this.arrayMusic;
    }

}
