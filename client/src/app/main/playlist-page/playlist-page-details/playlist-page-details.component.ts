import {Component, OnInit} from '@angular/core';
import {CacheService} from '../../../_services';
import {ActivatedRoute} from '@angular/router';
import {SongInterface} from "../../../_interfaces";

@Component({
    selector: 'app-playlist-page-details',
    templateUrl: './playlist-page-details.component.html',
    styleUrls: ['../playlist-page.component.css']
})
export class PlaylistPageDetailsComponent implements OnInit {
    public arrayMusic: SongInterface[] = [];

    constructor(private cacheService: CacheService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.getPlaylistSongs();
    }

    public getPlaylistSongs() {
        const playlist_slug = this.activatedRoute.snapshot.params['slug'];
        const url = 'playlist/' + playlist_slug;
        this.cacheService.get(url, 'song').subscribe(res => {
            console.log(res)
            this.arrayMusic = res;
        });
    }

}
