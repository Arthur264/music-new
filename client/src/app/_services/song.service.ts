import {Injectable} from '@angular/core';
import {SongInterface} from '../_interfaces';
import {PlayerService} from './player.service';

@Injectable()
export class SongService {
    public arraySong: SongInterface[] = [];
    private emit_player_song: boolean = false;

    constructor(
        private playerService: PlayerService,
    ) {
    }
    public emitSongArray() {
        this.emit_player_song = false;
        this.playerService.emitArrayMusic(this.arraySong);
    }

    public emitPlayerSong(){
        if (!this.emit_player_song) {
            this.sendSongs.emit();
            this.emit_player_song = true;
        }
    }
    public addToPlaylist(music, template) {
        this.addToPlaylistSongId = music.id;
        this.modalRef = this.modalService.show(template);
    }

    private beforePlay(){
        this.arraySong = this.arraySong.map((item) => {
            if (item.play){
                item.play = !item.play;
            }
            return item;
        })
    }
}
