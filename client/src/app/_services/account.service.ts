import {Injectable} from '@angular/core';
import {AppConfig} from '../app.config';
import {UserInterface} from '../_interfaces';
import {Router} from '@angular/router';

@Injectable()
export class AccountService {
    constructor(private router: Router) {

    }

    private _user: UserInterface;

    get user() {
        if (!this._user) {
            this._user = JSON.parse(localStorage.getItem('user'));
        }
        return this._user;
    }

    set user(user_data: UserInterface) {
        localStorage.setItem('user', JSON.stringify(user_data));
        this._user = user_data;
    }

    private _token: string;

    get token() {
        if (!this._token) {
            this._token = JSON.parse(localStorage.getItem('token'));
        }
        return this._token;
    }

    set token(token_data: string) {
        localStorage.setItem('token', JSON.stringify(token_data));
        this._token = token_data;
    }

    public save(data) {
        this._clear();
        this.user = this.set_default_user_data(data.user);
        this.token = data.token;
    }

    public is_login() {
        return this.user != null || this.token != null;
    }

    public logout() {
        this.router.navigate(['/account', 'login']);
        this._clear();
    }

    private _clear() {
        this._user = null;
        this.token = null;
        localStorage.clear();
    }

    private set_default_user_data(user_data) {
        if (user_data.avatar == null) {
            user_data.avatar = AppConfig.DEFAULT_USER_IMAGE;
        }
        return user_data;
    }
}
