import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AccountService} from './_services/account.service';
import {UserInterface} from './_interfaces/user.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AccountService]
})

export class AppComponent implements OnDestroy, OnInit {
    public viewComponent: string = null;
    private sub: any;
    public user: UserInterface;

    constructor(private accountService: AccountService) {
    }

    ngOnInit() {
        this.user = this.accountService.user;
    }

    ngOnDestroy() {
    }
}
