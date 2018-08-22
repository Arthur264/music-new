import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: AccountComponent,
      children: [{
        path: 'login',
        component: AccountLoginComponent,
        data:{
          title: 'Login'
        }
      }, {
        path: 'register',
        component: AccountRegisterComponent,
        data:{
          title: 'Register'
        }
      }]

    }])
  ],
  declarations: [AccountComponent, AccountLoginComponent, AccountRegisterComponent]
})
export class AccountModule {}
