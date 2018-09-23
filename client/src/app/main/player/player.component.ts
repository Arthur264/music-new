import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongInterface} from '../../_interfaces';
import {AppService, PlayerService} from '../../_services';

@Component({
    selector: 'app-music-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, AfterViewInit {
    @ViewChild('progress') progress;
    audio: HTMLAudioElement;
    currentTime: string;
    totalTime: string;
    currentSong: SongInterface;
    arrayMusic: SongInterface[];

    constructor(private appService: AppService, private playerService: PlayerService) {
        this.audio = new Audio();
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.InitSettings();
    }

    public MoveAudio(ev): void {
        const profit = ev.offsetX / ev.target.clientWidth;
        this.ChangeCurrentTime(this.audio.duration * profit);
        this.MoveBack(this.audio.currentTime);
    }

    public ChangeSong(obj: SongInterface): void {
        this.appService.get('song/' + obj.id + '/addplay').subscribe().unsubscribe();
        this.audio.src = obj.url;
        this.currentSong = obj;
        this.audio.id = String(obj.artist.id);
        this.audio.currentTime = 0;
        this.audio.addEventListener('canplay', () => {
            this.PlaySong();
        });
    }

    public PlayStop() {
        this.audio.paused ? this.PlaySong() : this.StopSong();
    }

    private InitSettings() {
        const self = this;
        this.audio.addEventListener('canplay', () => {
            this.totalTime = this.TransformTime(this.audio.duration);
        });
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.TransformTime(this.audio.currentTime);
            self.MoveBack(self.audio.currentTime);
        });
        this.audio.addEventListener('ended', function () {
            self.NextSoung();
        });
    }

    private MoveBack(curtime) {
        this.progress.nativeElement.style.width = String((curtime / this.audio.duration) * 100 + '%');
    }

    private ChangeCurrentTime(currentTime) {
        this.audio.currentTime = currentTime;
    }

    private PlaySong(): void {
        this.totalTime = this.TransformTime(this.audio.duration);
        this.audio.play();
    }

    private NextSoung(): void {
        for (let i = 0; i < this.arrayMusic.length; i++) {
            if (this.arrayMusic[i].id === Number(this.audio.id)) {
                if (i !== (this.arrayMusic.length - 1)) {
                    this.ChangeSong(this.arrayMusic[i + 1]);
                } else {
                    this.ChangeSong(this.arrayMusic[0]);
                }
                break;
            }
        }
    }

    private PrevSoung(): void {
        for (let i = 0; i < this.arrayMusic.length; i++) {
            if (this.arrayMusic[i].id === Number(this.audio.id)) {
                if (i !== 0) {
                    this.ChangeSong(this.arrayMusic[i - 1]);
                } else {
                    this.ChangeSong(this.arrayMusic[this.arrayMusic.length - 1]);
                }
                break;
            }
        }
    }

    private TransformTime(time: number): string {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
    }

    private StopSong(): void {
        this.audio.pause();
    }
}

