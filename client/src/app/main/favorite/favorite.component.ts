import {Component, OnInit} from '@angular/core';
import {SongInterface} from "../../_interfaces";
import {AppService} from "../../_services";

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
    public arrayMusic: SongInterface[] = [];

    constructor(
        private appService: AppService,
    ) {}

    ngOnInit() {
        this.getFavorite();
    }
    public getFavorite(){
        this.appService.get('favorite').subscribe(res => {
            this.arrayMusic = res;
        });
    }

}
