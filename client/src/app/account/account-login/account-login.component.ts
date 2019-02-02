import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService, AppService} from '../../_services';
import {Router} from '@angular/router';
import {FormsUtils} from '../../utils/forms';
import {ApiRouting} from '../../api.routing';

@Component({
    selector: 'app-account-login',
    templateUrl: './account-login.component.html',
    styleUrls: ['../account.component.css']
})
export class AccountLoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private appService: AppService, private accountService: AccountService, private router: Router) {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {
    }

    public loginSubmit(loginData) {
        if (this.loginForm.valid) {
            this.appService.post(ApiRouting.auth_login, loginData.value).subscribe((res) => {
                this.accountService.save(res);
                this.router.navigate(['dashboard', 'music']);
            }, (err) => {
                FormsUtils.errorMessages(this.loginForm.controls, err.json());
            });
        }
    }
}
