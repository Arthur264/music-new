import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService, AccountService} from '../../_services';
import {Router} from '@angular/router';
import {FormsUtils} from '../../utils/forms';

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
            this.appService.post('auth/login', loginData.value).subscribe((res) => {
                this.accountService.save(res);
                this.router.navigate(['dashboard', 'music']);
            }, (err) => {
                this.loginForm.controls = FormsUtils.errorMessages(this.loginForm.controls, err.json());
            });
        } else {
            return false;
        }
    }
}
