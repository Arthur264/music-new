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
    constructor(private appService: AppService) {}
    ngOnInit() {}
}
