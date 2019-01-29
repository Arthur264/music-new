import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {UserInterface, SocialLinkInterface} from '../../_interfaces';
import {AccountService, AppService, AlertService} from '../../_services';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormsUtils} from '../../utils/forms';
import {PasswordValidation, UrlPattern} from '../../utils/validations';
import {ApiRouting} from '../../api.routing';
import {AppMessage} from '../../app.message';
import {ItemsPoll} from '../../_core/items_poll';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public profileForm: FormGroup;
    public changePasswordForm: FormGroup;
    public socialLinkForm: FormGroup;
    public user: UserInterface;
    public modalRef: BsModalRef;
    public socialLinkItems = new ItemsPoll<SocialLinkInterface>();
    public image_preload = false;
    @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

    constructor(private accountService: AccountService,
                private appService: AppService,
                private modalService: BsModalService,
                private alertService: AlertService,
                private fb: FormBuilder,) {
        this.user = this.accountService.user;
        this.profileForm = new FormGroup({
            first_name: new FormControl(this.user.first_name, Validators.required),
            last_name: new FormControl(this.user.last_name, Validators.required),
            username: new FormControl(this.user.username, Validators.required),
            email: new FormControl(this.user.email, Validators.required),
            city: new FormControl(this.user.city),
            phone: new FormControl(this.user.phone),
        });
        this.changePasswordForm = this.fb.group({
            old_password: ['', Validators.required],
            new_password: ['', Validators.required],
            confirm_password: ['', Validators.required],
        }, {
            validator: PasswordValidation.MatchPassword
        });
        this.socialLinkForm = this.fb.group({
            link: ['', [Validators.required, Validators.pattern(UrlPattern)]],
        });
    }

    ngOnInit() {
        this._getSocialLink();

    }

    private _getSocialLink() {
        this.appService.get(ApiRouting.social_link).subscribe((res) => {
            this.socialLinkItems.create(res.items);

        });
    }

    public submitChangePassword() {
        let form = this.changePasswordForm;
        if (form.valid) {
            this.appService.post(ApiRouting.change_password, form.value).subscribe((res) => {
                this.alertService.success(AppMessage.password_change_success);
            }, (err) => {
                FormsUtils.errorMessages(form.controls, err.json());
            });
        }
    }

    public submitChangeProfile() {
        let form = this.profileForm;
        if (form.valid) {
            this.appService.post(ApiRouting.user_me, form.value).subscribe((res) => {
                this.alertService.success(AppMessage.profile_info_success);
            }, (err) => {
                FormsUtils.errorMessages(form.controls, err.json());
            });
        }
    }

    public openModal() {
        this.modalRef = this.modalService.show(this.modalTemplate, {'class': 'modal-sm'});
    }

    public submitSocialLink() {
        let form = this.socialLinkForm;
        if (form.valid) {
            this.appService.post(ApiRouting.social_link, form.value).subscribe((res) => {
                this.alertService.success(AppMessage.social_link_success);
                this.socialLinkItems.unshift(res);
                this.modalRef.hide();
            }, (err) => {
                FormsUtils.errorMessages(form.controls, err.json());
            });
        }
    }

    public removeSocialLink(social_link_id) {
        let url = `${ApiRouting.social_link}/${social_link_id}`;
        this.appService.delete(url).subscribe((res) => {
            this.alertService.denger(AppMessage.social_link_delete);
            this.socialLinkItems.remove(social_link_id);
        });
    }

    public onAvatarChanged(event) {
        const file = event.target.files[0];
        if (!file.type.includes('image')) {
            return false;
        }
        this.image_preload = true;
        const uploadData = new FormData();
        uploadData.append('avatar', file, file.name);
        this.appService.uploadFormData(ApiRouting.user_avatar, uploadData).subscribe((res) => {
            this.alertService.success(AppMessage.user_avatar_success);
        }, (err) => {
            this.alertService.error(AppMessage.user_avatar_error);
        });
        this.image_preload = false;
    }
}
