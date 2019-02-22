import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SongInterface} from '../../_interfaces';
import {AppService, PlayerService} from '../../_services';
import {ApiRouting} from '../../api.routing';

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
    random_play: boolean = false;
    volume: boolean = true;
    current_volume: number = 0.5;
    subscribeArrayMusic: any;
    currentSong: SongInterface;
    arrayMusic: SongInterface[];
    randomArrayMusic: SongInterface[];

    get audio_volume_width() {
        return this.audio.volume * 100 + '%';
    }

    constructor(private appService: AppService,
                private playerService: PlayerService,) {
        this.audio = new Audio();
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.initSettings();
        this.getSong();
    }

    public moveAudio(ev): void {
        const profit = ev.offsetX / ev.target.clientWidth;
        this.changeCurrentTime(this.audio.duration * profit);
        this.moveBack(this.audio.currentTime);
    }

    public playStop() {
        this.audio.paused ? this.playSong() : this.stopSong();
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

    private changeSong(obj: SongInterface): void {
        this.appService.get(ApiRouting.song_add_play.format(obj.id)).subscribe().unsubscribe();
        this.audio.src = obj.url + '?play=on';
        this.currentSong = obj;
        this.audio.id = String(obj.id);
        this.audio.currentTime = 0;
        this.audio.addEventListener('canplay', () => {
            this.playSong();
        });
        this.audio.addEventListener('error', () => {
            if (this.audio.error.code === 4) {
                this.appService.get(ApiRouting.song_hidden.format(obj.id)).subscribe();
            }
        });
    }

    private getSong() {
        this.playerService.getSong().subscribe((currentSong) => {
            this.changeSong(currentSong);
            if (!this.first_play) {
                this.first_play = true;
            }
        });
        this.subscribeArrayMusic = this.playerService.getArrayMusic().subscribe(arrayMusic => {
            this.randomArrayMusic = [];
            this.arrayMusic = arrayMusic;
        });
    }

    private initSettings() {
        const self = this;
        this.audio.addEventListener('canplay', () => {
            this.totalTime = this.transformTime(this.audio.duration);
        });
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.transformTime(this.audio.currentTime);
            self.moveBack(self.audio.currentTime);
        });
        this.audio.addEventListener('ended', function () {
            if (!self.circle_play) {
                return self.nextSong();
            }
            return self.playSong();
        });
    }

    private moveBack(current_time) {
        this.progress.nativeElement.style.width = String((current_time / this.audio.duration) * 100 + '%');
    }

    private changeCurrentTime(currentTime) {
        this.audio.currentTime = currentTime;
    }

    private playSong(): void {
        this.play = true;
        this.totalTime = this.transformTime(this.audio.duration);
        this.audio.play();
    }

    public nextSong(): void {
        for (let i = 0; i < this.arrayMusic.length; i++) {
            if (this.arrayMusic[i].id === Number(this.audio.id)) {
                if (i !== (this.arrayMusic.length - 1)) {
                    return this.changeSong(this.arrayMusic[i + 1]);
                }
                return this.changeSong(this.arrayMusic[0]);
            }
        }
        return this.stopSong();
    }

    public prevSong(): void {
        for (let i = 0; i < this.arrayMusic.length; i++) {
            if (this.arrayMusic[i].id === Number(this.audio.id)) {
                if (i !== 0) {
                    this.changeSong(this.arrayMusic[i - 1]);
                } else {
                    this.changeSong(this.arrayMusic[this.arrayMusic.length - 1]);
                }
                break;
            }
        }
    }

    private transformTime(time: number): string {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
    }

    private stopSong(): void {
        this.play = false;
        this.audio.pause();
    }

    public randomSort(arr) {
        arr.sort(function () {
            return .5 - Math.random();
        });
        return arr;
    }

    public changeRandomPlay() {
        if (!this.randomArrayMusic) {
            this.randomArrayMusic = this.randomSort(this.arrayMusic);
        }
    }

    public changeVolume(ev) {
        const volume_bar = ev.target.closest('.volume-bar') || ev.target;
        let volume_bar_value = ev.target.querySelector('.volume-bar-value') || ev.target;
        const profit = ev.offsetX / volume_bar.clientWidth;
        this.audio.volume = profit;
        if (!profit) {
            this.offVolume();
        }
    }

    public onOffVolume() {
        if (this.volume) {
            return this.offVolume();
        }
        return this.onVolume();
    }

    private offVolume() {
        this.audio.volume = 0;
        this.volume = false;
    }

    private onVolume() {
        this.audio.volume = this.current_volume;
        this.volume = true;
    }

}

