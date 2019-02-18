import {Component, OnInit} from '@angular/core';
import {SongInterface} from '../../_interfaces';
import {ActivatedRoute, Params} from '@angular/router';
import {AppService, RouterService, SongService} from '../../_services';
import {FilterItems} from '../../_items';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css'],
    providers: [RouterService]
})
export class MusicComponent implements OnInit {
    public arraySong: SongInterface[] = [];
    public page_title: string = 'Songs';
    public api_page_url = 'song';
    public filterItems = FilterItems;
    public song_ordering;
    public paginationQueryParams: Params = Object.assign({}, this.route.snapshot.queryParams);

    constructor(private appService: AppService,
                private activatedRoute: ActivatedRoute,
                private route: ActivatedRoute,
                private routerService: RouterService,
                private songService: SongService,) {
        this.getArtistId();
    }

    ngOnInit() {
        this.getSongOrdering();
        this.getSongArray();
    }

    public changeOrdering(param) {
        const order_id = param instanceof Object ? param['id'] : param;
        this.song_ordering = order_id;
        this.routerService.updateQueryParams({'ordering': order_id});
        this.paginationQueryParams = Object.assign({}, this.paginationQueryParams, {'ordering': order_id});
    }

    private getArtistId() {
        const artist_id = this.activatedRoute.snapshot.params['id'];
        if (artist_id) {
            this.api_page_url = `artist/${artist_id}`;
        }
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

    private getSongOrdering() {
        const song_ordering = this.activatedRoute.snapshot.queryParams['ordering'];
        if (song_ordering) {
            this.changeOrdering(song_ordering);
        }
    }

    public getArtistInfo(res) {
        if (res.name) {
            this.page_title = res.name;
        }
    }
}
