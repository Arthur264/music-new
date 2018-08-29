import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { WidgetModule } from '../widget/widget.module';

@NgModule({
  imports: [
    CommonModule,
    WidgetModule,
    FormsModule,
    ReactiveFormsModule,
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
  providers: [AccountService],
  declarations: [AccountComponent, AccountLoginComponent, AccountRegisterComponent]
})
export class AccountModule {}
