import {Component, OnInit} from '@angular/core';
import {UserInterface} from '../_interfaces/user.interface';
import {AccountService} from '../_services/account.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    public user: UserInterface;
    public isDropup = true;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.user;

    }
    ngOnInit() {

    }

}
