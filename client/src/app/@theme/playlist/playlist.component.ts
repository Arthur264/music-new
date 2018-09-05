import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../_services/app.service';
import {PlaylistInterface} from '../../_interfaces/playlist.interface';
import {AlertService} from '../../_services/alert.service';
import {PlaylistService} from '../../_services/playlist.service';


@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.css'],
    providers: [PlaylistService]
})
export class PlaylistComponent implements OnInit {
    public playlistForm: FormGroup;
    public playlistItems: PlaylistInterface[] = [];
    public modalRef: BsModalRef;

    constructor(private modalService: BsModalService,
                private appService: AppService,
                private playlistService: PlaylistService,
                private alertService: AlertService) {
        this.playlistForm = new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.playlistService.playlist().subscribe(playlist => {
            this.playlistItems = playlist;
        });
    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    public playlistSubmit(playlistData) {
        if (this.playlistForm.valid) {
            this.appService.post('playlist', playlistData.value).subscribe((res) => {
                this.modalRef.hide();
                this.alertService.success('Playlist created!');
            }, (err) => {
            });
        } else {
            return false;
        }
    }

}
