import {Injectable} from '@angular/core';
import {SongInterface} from '../_interfaces';
import {PlayerService} from './player.service';

@Injectable()
export class SongService {
    public arraySong: SongInterface[] = [];
    private send_player_song: boolean = false;

    constructor(
        private playerService: PlayerService,
    ) {
    }
    public sendSongsArray() {
        this.send_player_song = false;
        this.playerService.emitArrayMusic(this.arraySong);
    }

    public emitPlayerSong(){
        if (!this.send_player_song) {
            this.sendSongs.emit();
            this.send_array_music = true;
        }
    }
    public addToPlaylist(music, template) {
        this.addToPlaylistSongId = music.id;
        this.modalRef = this.modalService.show(template);
    }
}
