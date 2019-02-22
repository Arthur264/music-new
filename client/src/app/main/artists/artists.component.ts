import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArtistInterface, TagInterface} from '../../_interfaces';
import {AppService, RouterService} from '../../_services';
import {ActivatedRoute, Params} from '@angular/router';
import {AutoUnsubscribe} from '../../utils/unsubscribe';
import {Subscription} from 'rxjs';
import {SearchService} from '../../_services/search.service';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.css'],
    providers: [RouterService]
})
@AutoUnsubscribe(['_$tagSub', '_$searchSub', '_$searchServerSub'])
export class ArtistsComponent implements OnInit, OnDestroy {
    private _$tagSub: Subscription;
    private _$searchSub: Subscription;
    private _$searchServerSub: Subscription;
    public arrayTag: TagInterface[] = [];
    public arrayArtist: ArtistInterface[] = [];
    public activeTagIndex: number = null;
    public showPagination = true;
    public api_page_url: string = 'artist';
    public page_title: string = 'Artists';
    public paginationQueryParams: Params = Object.assign({}, this.route.snapshot.queryParams);

    constructor(private appService: AppService,
                private routerService: RouterService,
                private searchService: SearchService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this._getTag();
        this._getSearch();
    }

    private _getSearch() {
        this.searchService.turnOn();
        this._$searchSub = this.searchService.getSearch().subscribe((searchValue: string) => {
            this.showPagination = false;
            this._$searchServerSub = this.appService.get('search', {
                'q': searchValue,
                'type': 'artist'
            }).subscribe(res => {
                this.page_title = searchValue;
                this.getArtistItems(res);
            });
        });
    }

    private _getTag() {
        this._$tagSub = this.appService.get('tag').subscribe((res) => {
            this.arrayTag = res.items;
        });
    }

    public changeTag(tag, index) {
        this.activeTagIndex = index;
        this.api_page_url = `tag/${tag.slug}`;
        this.routerService.updateQueryParams({'tag': tag.slug});
        this.paginationQueryParams = Object.assign({}, this.paginationQueryParams, {'tag': tag.slug});
    }

    public getArtistItems(items: ArtistInterface[]) {
        this.arrayArtist = items;
    }

    ngOnDestroy() {
        this.searchService.turnOff();
    }
}
