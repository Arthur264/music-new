import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicItem } from './music.item';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { AppService } from '../app.service';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
    arrayMusic: MusicItem[] = [];
    defaultSongImage: string = 'https://lastfm-img2.akamaized.net/i/u/174s/c6f59c1e5e7240a4c0d427abd71f3dbb';
    constructor(private appService: AppService) {}
    ngOnInit() {}
    public getSongImage(music){
        if (music.image == null && music.artist.image == null){
            return this.defaultSongImage
        }
        return music.image ? music.image:music.artist.image
    }
}
