import {Injectable} from '@angular/core';
import {AppConfig} from '../app.config';
import {UserInterface} from '../_interfaces/user.interface';

@Injectable()
export class AccountService {
    private _user: UserInterface;
    private _token: string;

    constructor() {
    }

    public save(data) {
        this.user = this.set_default_user_data(data.user);
        this.token = data.token;
    }

    public clear() {
        localStorage.clear();
    }

    get user() {
        if (!this._user) {
            this._user = JSON.parse(localStorage.getItem('user'));
        }
        return this._user;
    }

    get token() {
        if (!this._token) {
            this._token = JSON.parse(localStorage.getItem('token'));
        }
        return this._token;
    }

    set user(user_data: UserInterface) {
        localStorage.setItem('user', JSON.stringify(user_data));
        this._user = user_data;
    }

    set token(token_data: string) {
        localStorage.setItem('token', JSON.stringify(token_data));
        this._token = token_data;
    }

    private set_default_user_data(user_data) {
        if (user_data.avatar == null) {
            user_data.avatar = AppConfig.DEFAULT_USER_IMAGE;
        }
        return user_data;
    }

    public is_login() {
        if (this.user != null || this.token != null) {
            return true;
        }
        return false;
    }
}
