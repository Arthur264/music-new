import {AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SongInterface} from '../../_interfaces';
import {ActivatedRoute, Params} from '@angular/router';
import {RouterService, SearchService, SongService} from '../../_services';
import {FilterItems} from '../../_items';
import {AutoUnsubscribe} from '../../utils/unsubscribe';
import {Subscription} from 'rxjs';
import {ApiRouting} from '../../api.routing';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css'],
    providers: [RouterService],
})
@AutoUnsubscribe(['_$searchSub', '_$searchServerSub', '_$songSub'])
export class MusicComponent implements OnInit, OnDestroy, AfterContentChecked {
    private _$searchSub: Subscription;
    private _$searchServerSub: Subscription;
    private _$songSub: Subscription;
    public arraySong: SongInterface[] = [];
    public page_title: string = 'Songs';
    public api_page_url = 'song';
    public filterItems = FilterItems;
    public song_ordering;
    public showPagination = true;
    public paginationQueryParams: Params = Object.assign({}, this.route.snapshot.queryParams);

    constructor(private activatedRoute: ActivatedRoute,
                private route: ActivatedRoute,
                private routerService: RouterService,
                private searchService: SearchService,
                private cdRef: ChangeDetectorRef,
                private songService: SongService) {
        this._getArtistId();
    }

    ngOnInit() {
        this._getSongOrdering();
        this._getSongArray();
        this._getSearch();
    }

    ngAfterContentChecked() {
        this.searchService.turnOn();
    }

    private _getSearch() {
        this._$searchSub = this.searchService.getSearch().subscribe((searchValue: string) => {
            this.showPagination = false;
            this._$searchServerSub = this.searchService.search(searchValue).subscribe(res => {
                this.page_title = searchValue;
                this.getSongItems(res);
            });
        });
    }

    public changeOrdering(param) {
        const order_id = param instanceof Object ? param['id'] : param;
        this.song_ordering = order_id;
        this.routerService.updateQueryParams({'ordering': order_id});
        this.paginationQueryParams = Object.assign({}, this.paginationQueryParams, {'ordering': order_id});
    }

    private _getArtistId() {
        const artist_id = this.activatedRoute.snapshot.params['id'];
        if (artist_id) {
            this.api_page_url = ApiRouting.artist_details.format(artist_id);
        }
    }

    public getSongItems(items: SongInterface[]) {
        this.arraySong = items;
        this.songService.emitSongArray(items);
        this.cdRef.detectChanges();
    }

    private _getSongArray() {
        this._$songSub = this.songService.getSongArray().subscribe((items) => {
            this.arraySong = items;
            this.cdRef.detectChanges();
        });
    }

    private _getSongOrdering() {
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

    ngOnDestroy() {
        this.searchService.turnOff();
    }
}
