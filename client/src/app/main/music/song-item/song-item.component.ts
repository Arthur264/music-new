import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {PlayerService, AppService} from '../../../_services';
import {SongInterface} from '../../../_interfaces';

@Component({
    selector: 'song-item',
    templateUrl: './song-item.component.html',
    styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {
    @Input('item') music: SongInterface;
    @Output('sendSongs') sendSongs: EventEmitter<any> = new EventEmitter<any>();
    @Output('deleteFavorite') deleteFavorite: EventEmitter<number> = new EventEmitter<number>();
    private send_array_music: boolean = false;

    constructor(
        private playerService: PlayerService,
        private appService: AppService,
    ) {
    }

    ngOnInit() {
    }

    public playStopSong(obj) {
        obj.play = obj.play ? false : true;
        this.playerService.emitChangeSong(obj);
        if (!this.send_array_music) {
            this.sendSongs.emit();
            this.send_array_music = true;
        }
    }

    public favorite(music) {
        const url = `song/${music.id}/favorite`;
        if (music.favorite) {
            this.appService.delete(url, {}).subscribe((res) => {
                music.favorite = !music.favorite;
                this.deleteFavorite.emit(music.id);
            })
        } else {
            this.appService.get(url, {}).subscribe((res) => {
                music.favorite = !music.favorite;
            })
        }

        return true;
    }

}
