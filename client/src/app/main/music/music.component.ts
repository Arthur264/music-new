import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongInterface} from '../../_interfaces/song.interface';
import {AppService} from '../../_services/app.service';
import {AppConfig} from '../../app.config';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from '../../../../node_modules/rxjs';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit, OnDestroy {
    public arrayMusic: SongInterface[] = [];
    private routeSub: Subscription;
    public api_page_url = 'song';
    public title_page = 'Songs';
    public resposne: any;

    constructor(private appService: AppService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe(params => {
            const artist_id = params['id'];
            if (artist_id) {
                this.api_page_url = 'artist/' + artist_id;
            }
        });
        setTimeout(()=>{
            console.log(this.resposne)
            this.title_page = this.resposne ? this.resposne.name : this.title_page;
        }, 4000)

    }

    public getSongImage(music) {
        if (music.image == null && music.artist.image == null) {
            return AppConfig.DEFAULT_SONG_IMAGE;
        }
        return music.image ? music.image : music.artist.image;
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }
}
