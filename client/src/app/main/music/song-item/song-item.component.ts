import {Component, OnInit, Input} from '@angular/core';
import {PlayerService, AppService} from '../../../_services';
import {SongInterface} from '../../../_interfaces';

@Component({
    selector: 'app-song-item',
    templateUrl: './song-item.component.html',
    styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {
    @Input('item') music: SongInterface;
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
            // this.playerService.emitArrayMusic(this.arrayMusic);
            this.send_array_music = true;
        }
    }

    public favorite(music) {
        let favoriteMethod = music.favorite ? this.appService.delete : this.appService.get;
        favoriteMethod(`song/${music.id}/favorite`, {}).subscribe((res) => {
            music.favorite = !music.favorite;
        })
        return true;
    }

}
