import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {MusicComponent} from '../music.component';
import {MusicItem} from '../../app.item';
import {AppService} from '../../_services/app.service'; 

@Component({
    selector: 'app-music-player',
    templateUrl: './music-player.component.html',
    styleUrls: ['./music-player.component.css'],
})
export class MusicPlayerComponent implements OnInit, AfterViewInit {
    @ViewChild('progress') progress;
    audio: HTMLAudioElement;
    currentTime: any;
    nameSoung: string;
    authorSoung: string;
    totalTime: any;
    play: boolean = false;
    volume: boolean = true;
    arrayMusic: MusicItem[];

    constructor(private appService: AppService) {
        this.audio = new Audio();
        this.loadMusic();
    }

    ngAfterViewInit() {
        console.log('progress', this.progress.nativeElement.style.width);
    }

    ngOnInit() {
        
        let self = this;
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
        this.progress.nativeElement.style.width = String((curtime / this.audio.duration) * 100 + "%");
    }

    private ChangeCurrentTime(timet) {
        this.audio.currentTime = timet;
    }

    private PlaySong(): void {
        this.play = true;
        this.totalTime = this.TransformTime(this.audio.duration);
        this.audio.play();
    }

    public MoveAudio(ev): void {
        let profit = ev.offsetX / ev.target.clientWidth;
        this.ChangeCurrentTime(this.audio.duration * profit);
        this.MoveBack(this.audio.currentTime);
    }

    private NextSoung(): void {
        for (let i = 0; i < this.arrayMusic.length; i++) {
            if (this.arrayMusic[i].id == Number(this.audio.id)) {
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
            if (this.arrayMusic[i].id == Number(this.audio.id)) {
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
        let min = Math.floor(time / 60);
        let sec = Math.floor(time % 60);
        return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
    }

    private StopSong(): void {
        this.audio.pause();
    }

    public ChangeSong(item): void {
        this.audio.src = item.url;
        this.nameSoung = item.name;
        this.authorSoung = item.author;
        this.audio.id = item.id;
        this.audio.currentTime = 0;
        this.audio.addEventListener('canplay', () => {
            this.PlaySong();
        });
    }

    public PlayStop() {
        this.audio.paused ? this.PlaySong() : this.StopSong();
    }
    private loadMusic() {
        this.appService.get('song').subscribe((res) => {
            this.arrayMusic = res.results;
        });
    }
}

