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
    arrayMusic: MusicItem[];
    total_pages: Number;
    constructor(private appService: AppService) {}
    ngOnInit() {
        this.loadMusic();
    }
    private loadMusic() {
        this.appService.get('song').subscribe((res) => {
            this.arrayMusic = res.results;
            this.total_pages = res.total_pages;
        });
    }
    // public 
}
