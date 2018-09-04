import {Component, OnInit} from '@angular/core';
import {ArtistInterface} from '../../_interfaces/artist.interface';
import {TagInterface} from '../../_interfaces/tag.interface';
import {AppService} from '../../_services/app.service';
import {AppConfig} from '../../app.config';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
    public arrayTag: TagInterface[] = [];
    public arrayArtist: ArtistInterface[] = [];
    public activeTagIndex: number = null;

    constructor(private appService: AppService) {
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
        });
    }

    public getArtistImage(artist) {
        if (artist.image == null) {
            return AppConfig.DEFAULT_ARTIST_IMAGE;
        }
        return artist.image;
    }
}
