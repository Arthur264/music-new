import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '../../_interfaces';
import {AccountService} from '../../_services';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public profileForm: FormGroup;
    public user: UserInterface;

    constructor(
        private accountService: AccountService,
    ) {
        this.user = this.accountService.user;
        this.profileForm = new FormGroup({
            first_name: new FormControl(this.user.first_name, Validators.required),
            last_name: new FormControl(this.user.last_name, Validators.required),
            username: new FormControl(this.user.username, Validators.required),
            email: new FormControl(this.user.email, Validators.required),
            city: new FormControl(this.user.city, Validators.required),
            phone: new FormControl(this.user.phone, Validators.required),
        });

    }

    ngOnInit() {
    }

}
