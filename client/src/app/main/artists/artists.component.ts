import {Component, OnInit} from '@angular/core';
import {ArtistInterface, TagInterface} from '../../_interfaces';
import {AppService, RouterService} from '../../_services';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.css'],
    providers: [RouterService]
})
export class ArtistsComponent implements OnInit {
    public arrayTag: TagInterface[] = [];
    public arrayArtist: ArtistInterface[] = [];
    public activeTagIndex: number = null;
    public api_page_url: string = 'artist';
    public paginationQueryParams: Params = Object.assign({}, this.route.snapshot.queryParams);

    constructor(private appService: AppService,
                private routerService: RouterService,
                private route: ActivatedRoute,) {
    }

    ngOnInit() {
        this.appService.get('tag').subscribe((res) => {
            this.arrayTag = res.items;
        });
    }

    public changeTag(tag, index) {
        this.activeTagIndex = index;
        this.api_page_url = `tag/${tag.slug}`;
        this.routerService.updateQueryParams({'tag': tag.slug});
        this.paginationQueryParams = Object.assign({}, this.paginationQueryParams, {'tag': tag.slug});
    }

    public getArtistItems(item: ArtistInterface[]) {
        this.arrayArtist = item;
    }
}
