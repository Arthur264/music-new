import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms'
import { AppService } from '../../app.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private appService: AppService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}
  
  public loginSubmit(loginData) {
    if (this.loginForm.valid) {
      this.appService.post('account/login', loginData.value).subscribe(res => {
          console.log(res)
      });
    }
    else {
      return false;
    }
  }
}
