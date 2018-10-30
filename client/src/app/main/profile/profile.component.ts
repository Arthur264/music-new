import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '../../_interfaces';
import {AccountService, AppService} from '../../_services';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public profileForm: FormGroup;
    public changePasswordForm: FormGroup;
    public user: UserInterface;
    public config: DropzoneConfigInterface;

    constructor(
        private accountService: AccountService,
        private appService: AppService,
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
        this.changePasswordForm = new FormGroup({
            old_password: new FormControl('', Validators.required),
            new_password: new FormControl('', Validators.required),
            confirm_password: new FormControl('', Validators.required),
        });

        this.config = {
            maxFiles: 1,
            clickable: true,
            headers: { 'Authorization': 'Token ' + this.accountService.token },
            url: this.appService.getUrl('avatar')
        }

    }

    ngOnInit() {
    }
    public submitChangePassword(){
        if (this.changePasswordForm.valid) {

        }
    }

    public submitChangeProfile(){
        if (this.profileForm.valid) {

        }
    }
}
