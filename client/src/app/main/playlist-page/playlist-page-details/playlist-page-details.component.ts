import {Component, OnInit} from '@angular/core';
import {AppService, PlayerService} from '../../../_services';
import {ActivatedRoute} from '@angular/router';
import {SongInterface} from '../../../_interfaces';

@Component({
    selector: 'app-playlist-page-details',
    templateUrl: './playlist-page-details.component.html',
    styleUrls: ['../playlist-page.component.css']
})
export class PlaylistPageDetailsComponent implements OnInit {
    public arrayMusic: SongInterface[] = [];
    private send_music: boolean = false;
    private playlist_slug: string;

    constructor(
        private appService: AppService,
        private activatedRoute: ActivatedRoute,
        private playerService: PlayerService,
    ) {
        this.playlist_slug = this.activatedRoute.snapshot.params['slug'];
    }

    ngOnInit() {
        this.getPlaylistSongs();
    }

    public playSong(obj) {
        this.playerService.emitChangeSong(obj);
        if (!this.send_music) {
            this.playerService.emitArrayMusic(this.arrayMusic);
            this.send_music = true;
        }
    }

    public getPlaylistSongs() {
        const url = 'playlist/' + this.playlist_slug;
        this.appService.get(url).subscribe(res => {
            this.arrayMusic = res['song'];
        });
    }

    public removeSong(song_id) {
        const url = 'playlist/' + this.playlist_slug + '/tracks';
        this.appService.delete(url, {'tracks': [song_id]}).subscribe(res => {
            this.arrayMusic = this.arrayMusic.filter(function (item) {
                return item.id !== song_id;
            });
        });
    }

}
