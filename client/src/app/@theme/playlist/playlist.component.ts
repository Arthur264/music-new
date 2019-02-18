import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService, AppService, CacheService} from '../../_services';
import {PlaylistInterface} from '../../_interfaces';
import {FormsUtils} from '../../utils/forms';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.css'],
    providers: [CacheService]
})
export class PlaylistComponent implements OnInit {
    public playlistForm: FormGroup;
    public playlistItems: PlaylistInterface[] = [];
    public modalRef: BsModalRef;

    constructor(private modalService: BsModalService,
                private appService: AppService,
                private cacheService: CacheService,
                private alertService: AlertService,) {
        this.playlistForm = new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.cacheService.get('playlist').subscribe(playlist => {
            this.playlistItems = playlist;
        });
    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {'class': 'modal-sm'});
    }

    public playlistSubmit() {
        if (this.playlistForm.valid) {
            this.appService.post('playlist', this.playlistForm.value).subscribe((res) => {
                this.cacheService.addToCache('playlist', res);
                this.modalRef.hide();
                this.alertService.success('Playlist created!');
                this.playlistForm.reset();
            }, (err) => {
                const errors = err.error;
                if (errors.slug) {
                    const errorMes = {'name': ['Playlist with this name already exists']};
                    FormsUtils.errorMessages(this.playlistForm.controls, errorMes);
                }
            });
        } else {
            return false;
        }
    }

}
