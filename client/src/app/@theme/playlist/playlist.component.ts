import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../_services/app.service';
import {PlaylistInterface} from '../../_interfaces/playlist.interface';
import {AlertService} from '../../_services/alert.service';


@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
    public playlistForm: FormGroup;
    public playlistItems: PlaylistInterface[] = [];
    public modalRef: BsModalRef;

    constructor(private modalService: BsModalService, private appService: AppService, private alertService: AlertService) {
        this.playlistForm = new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.alertService.error('test');
        this.appService.get('playlist').subscribe(res => {
            this.playlistItems = res.items;
        });
    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    public playlistSubmit(playlistData) {
        if (this.playlistForm.valid) {
            this.appService.post('playlist', playlistData.value).subscribe((res) => {
                this.modalRef.hide();
            }, (err) => {
            });
        } else {
            return false;
        }
    }

}
