import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService, AppService} from '../../_services';
import {FormsUtils} from '../../utils/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-account-register',
    templateUrl: './account-register.component.html',
    styleUrls: ['../account.component.css'],

})
export class AccountRegisterComponent implements OnInit {
    public registerForm: FormGroup;

    constructor(private appService: AppService, private accountService: AccountService, private router: Router) {
        this.registerForm = new FormGroup({
            username: new FormControl('', Validators.required),
            email: new FormControl('', Validators.email),
            password: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {
    }

    public registerSubmit(registerData) {
        if (this.registerForm.valid) {
            this.appService.post('auth/register', registerData.value).subscribe((res) => {
                this.accountService.save(res);
                this.router.navigate(['/dashboard', 'music']);
            }, (err) => {
                this.registerForm.controls = FormsUtils.errorMessages(this.registerForm.controls, err.error);
            });
        } else {
            return false;
        }
    }

}
