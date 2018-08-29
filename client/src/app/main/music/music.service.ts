import { AppService } from '../_services/app.service';
import { Injectable } from '@angular/core';
import { MusicItem } from '../app.item';

@Injectable()
export class MusicService {
    arrayMusic: MusicItem[];
    constructor(private appService: AppService) {}

    public getMusic() {
        if (this.arrayMusic){
            return this.arrayMusic;
        };
        this.appService.get('song').subscribe((res) => {
            this.arrayMusic = res.results;
            return this.arrayMusic
        });
    }
}
