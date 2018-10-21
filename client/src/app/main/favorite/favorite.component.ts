import {Component, OnInit} from '@angular/core';
import {SongInterface} from '../../_interfaces';
import {AppService, PlayerService} from '../../_services';

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
    public arrayMusic: SongInterface[] = [];

    constructor(
        private appService: AppService,
        private playerService: PlayerService,
    ) {
    }

    ngOnInit() {
        this.getFavorite();
    }

    public getFavorite() {
        this.appService.get('favorite').subscribe(res => {
            this.arrayMusic = res;
        });
    }

    public sendSongsArray() {
        this.playerService.emitArrayMusic(this.arrayMusic);
    }

    public deleteFavoriteItem(song_id){
        this.arrayMusic = this.arrayMusic.filter((item) => {
            return item.id != song_id;
        })
    }

}
