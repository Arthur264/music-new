import {Component, OnInit} from '@angular/core';
import {AppService, PlayerService} from '../../../_services';
import {ActivatedRoute} from '@angular/router';
import {ApiRouting} from '../../../api.routing';
import {AutoUnsubscribe} from '../../../utils/unsubscribe';
import {Subscription} from 'rxjs';
import {PlaylistInterface} from '../../../_interfaces';

@Component({
    selector: 'app-playlist-page-details',
    templateUrl: './playlist-page-details.component.html',
    styleUrls: ['../playlist-page.component.css']
})
@AutoUnsubscribe(['_$playlistSub'])
export class PlaylistPageDetailsComponent implements OnInit {
    private _$playlistSub: Subscription;
    public playlist: PlaylistInterface;
    private send_music: boolean = false;
    private playlist_slug: string;

    constructor(private appService: AppService,
                private activatedRoute: ActivatedRoute,
                private playerService: PlayerService,) {
        this.playlist_slug = this.activatedRoute.snapshot.params['slug'];
    }

    ngOnInit() {
        this._getPlaylistSongs();
    }

    public playSong(obj) {
        this.playerService.emitChangeSong(obj);
        if (!this.send_music) {
            this.playerService.emitArrayMusic(this.playlist['song']);
            this.send_music = true;
        }
    }

    private _getPlaylistSongs() {
        this._$playlistSub = this.appService.get(ApiRouting.playlist_details.format(this.playlist_slug)).subscribe(res => {
            this.playlist = res;
        });
    }

    public removeSong(song_id) {
        this.appService.delete(ApiRouting.playlist_tracks.format(this.playlist_slug), {'tracks': [song_id]}).subscribe(res => {
            this.playlist['song'] = this.playlist['song'].filter(function (item) {
                return item.id !== song_id;
            });
        });
    }

}
