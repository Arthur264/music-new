import {Injectable, EventEmitter} from '@angular/core';
import {SongInterface} from '../_interfaces';
import {PlayerService} from './player.service';

@Injectable()
export class SongService {
    public _arraySong: SongInterface[] = [];
    private emit_player_song: boolean = false;
    private _eventSong: EventEmitter<SongInterface[]> = new EventEmitter<SongInterface[]> ();

    constructor(
        private playerService: PlayerService,
    ) {
    }
    public getSongArray() {
        return this._eventSong;
    }
    public emitSongArray(items: SongInterface[]) {
        this._eventSong.emit(items);
        if (this._arraySong != items) {
            this.emit_player_song = false;
            this._arraySong = items;
        }
    }

    public emitPlayerSong(song: SongInterface) {
        if (song.play){
            song.play = false;
        }else {
            this.beforePlay();
            song.play = true;
        }
        this.playerService.emitChangeSong(song);
        if (!this.emit_player_song) {
            this.playerService.emitArrayMusic(this._arraySong);
            this.emit_player_song = true;
        }
    }

    public addToPlaylist(music, template) {
        // this.addToPlaylistSongId = music.id;
        // this.modalRef = this.modalService.show(template);
    }

    private beforePlay() {
        this._arraySong = this._arraySong.map((item) => {
            item.play = false;
            return item;
        });
        this._eventSong.emit(this._arraySong);
    }
}
