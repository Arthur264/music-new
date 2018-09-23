import {Component, OnInit} from '@angular/core';
import {ArtistInterface, TagInterface} from '../../_interfaces';
import {AppService, RouterService} from '../../_services';
import {AppConfig} from '../../app.config';

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
    public pagination_url: string = 'artist';

    constructor(private appService: AppService, private routerService: RouterService) {
    }

    ngOnInit() {
        this.appService.get('tag').subscribe((res) => {
            this.arrayTag = res.items;
        });
    }

    public changeTag(tag, index) {
        this.activeTagIndex = index;
        this.appService.get('tag/' + tag.slug).subscribe((res) => {
            this.arrayArtist = res.items.items;
            this.routerService.updateQueryParams({'tag': tag.slug});
        });
    }

    public getArtistImage(artist) {
        if (artist.image == null) {
            return AppConfig.DEFAULT_ARTIST_IMAGE;
        }
        return artist.image;
    }
}
