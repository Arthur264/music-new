import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongInterface} from '../../_interfaces/song.interface';
import {AppService} from '../../_services/app.service';
import {AppConfig} from '../../app.config';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from '../../../../node_modules/rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlaylistInterface} from '../../_interfaces/playlist.interface';
import {CacheService} from '../../_services/cache.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FilterItems} from '../../_items/filter.items';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit, OnDestroy {
    public arrayMusic: SongInterface[] = [];
    public choosePlaylistForm: FormGroup;
    public api_page_url = 'song';
    public title_page = 'Songs';
    public playlists: PlaylistInterface[] = [];
    public modalRef: BsModalRef;
    public filterItems = FilterItems;
    private routeSub: Subscription;


    constructor(private modalService: BsModalService,
                private appService: AppService,
                private activatedRoute: ActivatedRoute,
                private cacheService: CacheService) {
        this.choosePlaylistForm = new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.cacheService.get('playlist').subscribe(playlist => {
            this.playlists = playlist;
        });
        this.routeSub = this.activatedRoute.params.subscribe(params => {
            const artist_id = params['id'];
            if (artist_id) {
                this.api_page_url = 'artist/' + artist_id;
            }
        });
    }
    public changeOrdering(ordering_field){
        console.log(ordering_field)
    }

    public getSongImage(music) {
        if (music.image == null && music.artist.image == null) {
            return AppConfig.DEFAULT_SONG_IMAGE;
        }
        return music.image ? music.image : music.artist.image;
    }

    public addToPlaylist(music, template) {
        this.modalRef = this.modalService.show(template);
    }

    public choosePlaylistSubmit() {
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }
}
