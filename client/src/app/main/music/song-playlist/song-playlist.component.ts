import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormsUtils} from '../../../utils/forms';
import {AlertService, AppService, CacheService, SongService} from '../../../_services';
import {PlaylistInterface, SongInterface} from '../../../_interfaces';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-song-playlist',
    templateUrl: './song-playlist.component.html',
    styleUrls: ['./song-playlist.component.css']
})
export class SongPlaylistComponent implements OnInit {
    public modalRef: BsModalRef;
    public selectPlaylistForm: FormGroup;
    public playlist: PlaylistInterface[] = [];
    public song: SongInterface;
    @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

    constructor(private modalService: BsModalService,
                private cacheService: CacheService,
                private appService: AppService,
                private alertService: AlertService,
                private songService: SongService,) {
        this.selectPlaylistForm = new FormGroup({
            name: new FormControl(null, Validators.required)
        });
    }

    ngOnInit() {
        this.getPlaylist();
        this.getPlaylistSong();
    }

    private getPlaylist() {
        this.cacheService.get('playlist').subscribe((items: PlaylistInterface[]) => {
            this.playlist = items;
        });
    }

    public getPlaylistSong() {
        this.songService.getPlaylistSong().subscribe((item) => {
            this.song = item;
            this.modalRef = this.modalService.show(this.modalTemplate, {class: 'modal-sm'});
        });

    }

    public selectPlaylistSubmit() {
        if (!this.selectPlaylistForm.valid) {
            return false;
        }
        const playlist_name = this.selectPlaylistForm.value.name;
        const url = `playlist/${playlist_name}/tracks`;
        this.appService.post(url, {'tracks': [this.song.id]}).subscribe((res) => {
            this.modalRef.hide();
            this.alertService.success(`Song added to playlist ${playlist_name}`);
        }, (err) => {
            this.selectPlaylistForm.controls = FormsUtils.errorMessages(this.selectPlaylistForm.controls, err.error);
        });
    }

}
