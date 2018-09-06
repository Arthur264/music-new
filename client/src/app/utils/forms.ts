export class FormsUtils {
    static errorMessages(controls, error) {
        for (const prop in controls) {
            if (prop in error) {
                controls[prop]['errorMessages'] = Object.values(error[prop]);
                controls[prop].setErrors({'response': true});
                controls[prop].valueChanges.emit();
            }
        }
        return controls;
    }
}
