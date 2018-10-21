import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlaylistInterface, SongInterface} from '../../_interfaces';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService, AppService, CacheService, PlayerService, RouterService,} from '../../_services';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FilterItems} from '../../_items';
import {FormsUtils} from '../../utils/forms';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css'],
    providers: [RouterService]
})
export class MusicComponent implements OnInit, OnDestroy {
    public arrayMusic: SongInterface[] = [];
    public choosePlaylistForm: FormGroup;
    public api_page_url = 'song';
    public playlists: PlaylistInterface[] = [];
    public modalRef: BsModalRef;
    public addToPlaylistSongId = null;
    public filterItems = FilterItems;
    public song_ordering;
    public paginationQueryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    private routeSub: Subscription;

    constructor(
        private modalService: BsModalService,
        private appService: AppService,
        private activatedRoute: ActivatedRoute,
        private cacheService: CacheService,
        private route: ActivatedRoute,
        private playerService: PlayerService,
        private routerService: RouterService,
        private alertService: AlertService,
    ) {
        this.choosePlaylistForm = new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.getPlayList();
        this.getArtistId();
        this.getSongOrdering();
    }
    public sendSongsArray(){
        this.playerService.emitArrayMusic(this.arrayMusic);
    }

    public changeOrdering(param) {
        const order_id = param instanceof Object ? param['id'] : param;
        FilterItems.map((item) => {
            if (item['id'] === order_id) {
                this.song_ordering = order_id;
                this.routerService.updateQueryParams({'ordering': order_id});
                this.paginationQueryParams = Object.assign({}, this.paginationQueryParams, {'ordering': order_id});
            }
        });
    }

    public addToPlaylist(music, template) {
        this.addToPlaylistSongId = music.id;
        this.modalRef = this.modalService.show(template);
    }
    public choosePlaylistSubmit(form) {
        if (this.choosePlaylistForm.valid) {
            const url = `playlist/${form.value.name}/tracks`;
            this.appService.post(url, {'song_id': this.addToPlaylistSongId}).subscribe((res) => {
                this.modalRef.hide();
                this.alertService.success('Playlist created!');
                this.addToPlaylistSongId = null;
            }, (err) => {
                this.choosePlaylistForm.controls = FormsUtils.errorMessages(this.choosePlaylistForm.controls, err.json());
            });
        } else {
            return false;
        }
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }

    private getArtistId() {
        this.routeSub = this.activatedRoute.params.subscribe(params => {
            const artist_id = params['id'];
            if (artist_id) {
                this.api_page_url = `artist/${artist_id}`;
            }
        });
    }

    private getSongOrdering() {
        const song_ordering = this.activatedRoute.snapshot.queryParams['ordering'];
        if (song_ordering) {
            this.changeOrdering(song_ordering);
        }
    }

    private getPlayList() {
        this.cacheService.get('playlist').subscribe(playlist => {
            this.playlists = playlist;
        });
    }
}
