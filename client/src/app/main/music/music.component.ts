import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongInterface} from '../../_interfaces';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AppService, RouterService,} from '../../_services';
import {FilterItems} from '../../_items';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css'],
    providers: [RouterService]
})
export class MusicComponent implements OnInit, OnDestroy {
    public arraySong: SongInterface[] = [];
    public api_page_url = 'song';
    public filterItems = FilterItems;
    public song_ordering;
    public paginationQueryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    private routeSub: Subscription;

    constructor(
        private appService: AppService,
        private activatedRoute: ActivatedRoute,
        private route: ActivatedRoute,
        private routerService: RouterService,
    ) {

    }

    ngOnInit() {
        this.getArtistId();
        this.getSongOrdering();
    }

    public changeOrdering(param) {
        const order_id = param instanceof Object ? param['id'] : param;
        this.song_ordering = order_id;
        this.routerService.updateQueryParams({'ordering': order_id});
        this.paginationQueryParams = Object.assign({}, this.paginationQueryParams, {'ordering': order_id});
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
}
