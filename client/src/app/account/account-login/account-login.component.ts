import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { AppService } from '../../_services/app.service';
import { AccountService } from '../../_services/account.service';
import { Router } from "@angular/router";

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

  ngOnInit() {}

  public loginSubmit(loginData) {
    if (this.loginForm.valid) {
      this.appService.post('auth/login', loginData.value).subscribe((res) => {
        this.accountService.save(res)
        this.router.navigate(['dashboard', 'music']);
      }, (err) => {});
    } else {
      return false;
    }
  }
}
