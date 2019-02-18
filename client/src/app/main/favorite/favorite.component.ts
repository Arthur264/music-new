import {Component, OnInit} from '@angular/core';
import {SongInterface} from '../../_interfaces';
import {AppService, SongService} from '../../_services';

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
    public arraySong: SongInterface[] = [];

    constructor(private appService: AppService,
                private songService: SongService,) {
    }

    ngOnInit() {
        this.getFavorite();
    }

    public getFavorite() {
        this.appService.get('favorite').subscribe(res => {
            this.arraySong = res;
        });
    }

    public getSongItems(item: SongInterface[]) {
        this.arraySong = item;
        this.songService.emitSongArray(item);
    }

    public getSongArray() {
        this.songService.getSongArray().subscribe((items) => {
            this.arraySong = items;
        });
    }

    public deleteFavoriteItem(song_id) {
        this.arraySong = this.arraySong.filter((item) => {
            return item.id != song_id;
        });
    }

}
