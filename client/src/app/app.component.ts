import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';
import { UserItem } from './app.item';
import { AccountService } from './_services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AccountService]
})

export class AppComponent implements OnDestroy, OnInit {
    public viewComponent: string = null;
    private sub: any;
    public user: UserItem;
    constructor(private router: Router, private route: ActivatedRoute, private accountService: AccountService) {
        this.sub = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(e => {
            let routeData = this.route.firstChild.snapshot.data;
            this.viewComponent = routeData.hasOwnProperty('component') ? routeData['component'] : null;
        });
    }
    ngOnInit() {
        this.user = this.accountService.user;
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
