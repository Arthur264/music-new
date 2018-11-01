import {EventEmitter, Injectable} from '@angular/core';
import {SongInterface} from '../_interfaces';
import {PlayerService} from './player.service';

@Injectable()
export class SongService {
    private _arraySong: SongInterface[] = [];
    private _playlistSong: EventEmitter<SongInterface> = new EventEmitter<SongInterface>();
    private emit_player_song: boolean = false;
    private _eventSong: EventEmitter<SongInterface[]> = new EventEmitter<SongInterface[]>();

    constructor(
        private playerService: PlayerService,
    ) {
    }

    public getSongArray() {
        return this._eventSong;
    }

    public getPlaylistSong() {
        return this._playlistSong;
    }

    public emitSongArray(items: SongInterface[]) {
        this._eventSong.emit(items);
        if (this._arraySong != items) {
            this.emit_player_song = false;
            this._arraySong = items;
        }
    }

    public emitPlaylistSong(item: SongInterface) {
        this._playlistSong.emit(item);
    }

    public emitPlayerSong(song: SongInterface) {
        if (song.play) {
            song.play = false;
        } else {
            this.beforePlay();
            song.play = true;
        }
        this.playerService.emitChangeSong(song);
        if (!this.emit_player_song) {
            this.playerService.emitArrayMusic(this._arraySong);
            this.emit_player_song = true;
        }
    }

    private beforePlay() {
        this._arraySong = this._arraySong.map((item) => {
            item.play = false;
            return item;
        });
        this._eventSong.emit(this._arraySong);
    }
}
