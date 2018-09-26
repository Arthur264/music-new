import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SongInterface} from '../../_interfaces';
import {AppService, PlayerService} from '../../_services';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('progress') progress;
    audio: HTMLAudioElement;
    currentTime: string;
    totalTime: string;
    subscribeSong: any;
    first_play: boolean = false;
    play: boolean = false;
    circle_play: boolean = false;
    subscribeArrayMusic: any;
    currentSong: SongInterface;
    arrayMusic: SongInterface[];

    constructor(private appService: AppService, private playerService: PlayerService) {
        this.audio = new Audio();
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.initSettings();
        this.getSong();
    }

    public MoveAudio(ev): void {
        const profit = ev.offsetX / ev.target.clientWidth;
        this.ChangeCurrentTime(this.audio.duration * profit);
        this.MoveBack(this.audio.currentTime);
    }

    public PlayStop() {
        this.audio.paused ? this.PlaySong() : this.StopSong();
    }

    ngOnDestroy() {
        if (this.subscribeArrayMusic) {
            this.subscribeArrayMusic.unsubscribe();
        }
        if (this.subscribeSong) {
            this.subscribeSong.unsubscribe();
        }
    }

    public changeCirclePlay() {
        this.circle_play = !this.circle_play;
    }

    private ChangeSong(obj: SongInterface): void {
        this.appService.get('song/' + obj.id + '/addplay').subscribe().unsubscribe();
        this.audio.src = obj.url;
        this.currentSong = obj;
        this.audio.id = String(obj.artist.id);
        this.audio.currentTime = 0;
        this.audio.addEventListener('canplay', () => {
            this.PlaySong();
        });
    }

    private getSong() {
        this.playerService.getSong().subscribe((currentSong) => {
            this.ChangeSong(currentSong);
            if (!this.first_play) {
                this.first_play = true;
            }
        });
        this.subscribeArrayMusic = this.playerService.getArrayMusic().subscribe(arrayMusic => {
            this.arrayMusic = arrayMusic;
        });
    }

    private initSettings() {
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
        this.play = true;
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
        this.play = false;
        this.audio.pause();
    }
}

