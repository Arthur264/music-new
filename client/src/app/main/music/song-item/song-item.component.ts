import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService, PlayerService, SongService} from '../../../_services';
import {SongInterface} from '../../../_interfaces';

@Component({
    selector: 'song-item',
    templateUrl: './song-item.component.html',
    styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {
    @Input('item') music: SongInterface;
    @Input('has_playlist') has_playlist: boolean  = true;
    @Output('deleteFavorite') deleteFavorite: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private playerService: PlayerService,
        private appService: AppService,
        private songService: SongService,
    ) {
    }

    ngOnInit() {
    }

    public playStopSong(item) {
        this.songService.emitPlayerSong(item);
    }

    public favorite(music) {
        const url = `song/${music.id}/favorite`;
        if (music.favorite) {
            this.appService.delete(url, {}).subscribe((res) => {
                music.favorite = !music.favorite;
                this.deleteFavorite.emit(music.id);
            });
        } else {
            this.appService.get(url, {}).subscribe((res) => {
                music.favorite = !music.favorite;
            });
        }
        return true;
    }

    public playlist(song){
        this.songService.emitPlaylistSong(song);
    }

}
