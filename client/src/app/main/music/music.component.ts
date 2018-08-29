import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicItem } from '../app.item';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { AppService } from '../_services/app.service';
import { AppConfig } from '../app.config';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
    arrayMusic: MusicItem[] = [];
    constructor(private appService: AppService, private activatedRoute: ActivatedRoute) {}
    ngOnInit() {}
    public getSongImage(music) {
        if (music.image == null && music.artist.image == null) {
            return AppConfig.DEFAULT_SONG_IMAGE
        }
        return music.image ? music.image : music.artist.image
    }
}
