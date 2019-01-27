import {AbstractControl} from '@angular/forms';

export const UrlPattern = '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}' +
    '[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$';

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