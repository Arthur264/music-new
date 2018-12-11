import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {UserInterface} from '../../_interfaces';
import {AccountService, AppService} from '../../_services';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormsUtils} from '../../utils/forms';
import {AlertService} from '../../_services/alert.service';
import {PasswordValidation} from '../../utils/validations';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public profileForm: FormGroup;
    public changePasswordForm: FormGroup;
    public user: UserInterface;
    public modalRef: BsModalRef;
    @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

    constructor(
        private accountService: AccountService,
        private appService: AppService,
        private modalService: BsModalService,
        private alertService: AlertService,
        private fb: FormBuilder,
    ) {
        this.user = this.accountService.user;
        this.profileForm = new FormGroup({
            first_name: new FormControl(this.user.first_name, Validators.required),
            last_name: new FormControl(this.user.last_name, Validators.required),
            username: new FormControl(this.user.username, Validators.required),
            email: new FormControl(this.user.email, Validators.required),
            city: new FormControl(this.user.city, Validators.required),
            phone: new FormControl(this.user.phone, Validators.required),
        });
        this.changePasswordForm = this.fb.group({
            old_password: ['', Validators.required],
            new_password: ['', Validators.required],
            confirm_password: ['', Validators.required],
        }, {
            validator: PasswordValidation.MatchPassword
        });
    }

    ngOnInit() {
    }
    public submitChangePassword(){
        if (this.changePasswordForm.valid) {
            this.appService.post('auth/change-password', this.changePasswordForm.value).subscribe((res) => {
                this.alertService.success('Password successfully changed!');
            }, (err) => {
                this.changePasswordForm.controls = FormsUtils.errorMessages(this.changePasswordForm.controls, err.json());
            });
        }
    }

    public submitChangeProfile(){
        if (this.profileForm.valid) {

        }
    }

    public openModal(){
        this.modalRef = this.modalService.show(this.modalTemplate, {class: 'modal-sm'});
    }

    public onAvatarChanged(event){
        const file = event.target.files[0];
        if (!('image' in file.type)){
            return false;
        }
        const uploadData = new FormData();
        uploadData.append('avatar', file, file.name);
        // this.appService.uploadFormData()
    }
}
