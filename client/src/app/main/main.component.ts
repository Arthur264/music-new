import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {UserInterface} from '../_interfaces';
import {AccountService} from '../_services';
import {SongInterface} from '../_interfaces/song.interface';
import {NavigationStart, Router} from '@angular/router';
import 'rxjs/add/operator/filter';

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

    constructor(private accountService: AccountService, private router: Router, private cdRef: ChangeDetectorRef) {
        this.user = this.accountService.user;

    }

    ngOnInit() {
        this._changeRoute();
    }

    public getSongItems(items: SongInterface[]) {
        this.arraySong = items;
        this.cdRef.detectChanges();
    }

    private _changeRoute() {
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event: NavigationStart) => {
                if (event.url.split('?')[0] in ['/dashboard', '/']) {
                    this.mainComponent = true;
                } else {
                    this.mainComponent = false;
                }
            });
    }

}
