export class FormsUtils {
    static errorMessages(controls, error) {
        for(let prop in controls){
            if (prop in error){
                controls[prop]['errorMessages'] = Object.values(error[prop])
                controls[prop].valueChanges.emit();
                controls[prop].patchValue({'tet': 1})
                controls[prop].setErrors({'response': true});
            }
        }
        return controls;
    }
}
