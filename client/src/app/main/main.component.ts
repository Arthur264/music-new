import {Component, OnInit} from '@angular/core';
import {UserInterface} from '../_interfaces';
import {AccountService} from '../_services';
import {SongInterface} from '../_interfaces/song.interface';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    public user: UserInterface;
    public isDropup = true;
    public mainComponent = true;
    public arraySong: SongInterface[] = [];

    constructor(private accountService: AccountService) {
        this.user = this.accountService.user;

    }

    ngOnInit() {

    }

    public getSongItems(items: SongInterface[]){
        this.arraySong = items;
    }

}
