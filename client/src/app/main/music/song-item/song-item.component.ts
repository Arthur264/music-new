import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService, PlayerService} from '../../../_services';
import {SongInterface} from '../../../_interfaces';

@Component({
    selector: 'song-item',
    templateUrl: './song-item.component.html',
    styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {
    @Input('item') music: SongInterface;
    @Output('emitSongs') emitSongs: EventEmitter<any> = new EventEmitter<any>();
    @Output('deleteFavorite') deleteFavorite: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private playerService: PlayerService,
        private appService: AppService,
    ) {
    }

    ngOnInit() {
    }

    public playStopSong(obj) {
        obj.play = obj.play ? false : true;
        if (obj.play){
            this.emitSongs.emit();
        }
        this.playerService.emitChangeSong(obj);
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

}
