import {AbstractControl} from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('new_password').value;
        let confirmPassword = AC.get('confirm_password').value;
        if (password != confirmPassword) {
            AC.get('confirm_password').setErrors({match_password: true});
        } else {
            return null;
        }
    }
}