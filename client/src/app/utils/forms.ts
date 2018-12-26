export class FormsUtils {
    static errorMessages(controls, error) {
        for (const prop in controls) {
            if (prop in error) {
                let err_mes = Array.isArray(error[prop]) ?  error[prop]: error[prop][0];
                console.log(err_mes);
                controls[prop]['errorMessages'] = Object.values(err_mes);
                controls[prop].setErrors({'response': true});
                controls[prop].valueChanges.emit();
            }
        }
        return controls;
    }
}
