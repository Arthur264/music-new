import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../_services/account.service';
import {UserInterface} from '../../_interfaces/user.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [AccountService]
})
export class HeaderComponent implements OnInit {
    public user: UserInterface;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.user;

    }

    ngOnInit() {
    }

    public logout() {
        this.accountService.logout();
    }
}
