import {Injectable} from '@angular/core';
import {AccountService} from '../_services';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private accountService: AccountService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.accountService.is_login()) {
            return true;
        }
        this.router.navigate(['/account', 'login']);
        return false;
    }
}