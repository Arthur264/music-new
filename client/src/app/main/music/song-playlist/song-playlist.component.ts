import {Component, OnInit} from '@angular/core';
import {FormsUtils} from '../../../utils/forms';
import {AppService, CacheService, AlertService} from '../../../_services';
import {PlaylistInterface} from '../../../_interfaces';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-song-playlist',
    templateUrl: './song-playlist.component.html',
    styleUrls: ['./song-playlist.component.css']
})
export class SongPlaylistComponent implements OnInit {
    public modalRef: BsModalRef;
    public addToPlaylistSongId = null;
    public selectPlaylistForm: FormGroup;
    public playlist: PlaylistInterface[] = [];

    constructor(
        private modalService: BsModalService,
        private cacheService: CacheService,
        private appService: AppService,
        private alertService: AlertService,
    ) {
        this.selectPlaylistForm = new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
    }

    private getPlayList() {
        this.cacheService.get('playlist').subscribe(playlist => {
            this.playlist = playlist;
        });
    }

    public selectPlaylistSubmit(form) {
        if (!this.selectPlaylistForm.valid) {
            return false;
        }
        const url = `playlist/${form.value.name}/tracks`;
        this.appService.post(url, {'song_id': this.addToPlaylistSongId}).subscribe((res) => {
            this.modalRef.hide();
            this.alertService.success('Playlist created!');
            this.addToPlaylistSongId = null;
        }, (err) => {
            this.selectPlaylistForm.controls = FormsUtils.errorMessages(this.selectPlaylistForm.controls, err.json());
        });
    }

}
