import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {AppConfig} from '../app.config';
import {instanseofInterface} from '../_interfaces';

@Directive({
    selector: '[appImage]'
})
export class ImageDirective implements OnInit {
    @Input('appImage') appImage: any;

    constructor(private _el: ElementRef) {
    }

    ngOnInit() {
        if (!this.appImage.hasOwnProperty('preload')) {
            this._el.nativeElement.src = this.getImage();
            this._el.nativeElement.alt = this.getAlt();
        }
    }

    private getImage() {
        const item = this.appImage;
        if (instanseofInterface(item, 'Artist')) {
            if (item.image == null) {
                return AppConfig.DEFAULT_ARTIST_IMAGE;
            }
        }
        if (instanseofInterface(item, 'Song')) {
            if (item.image == null && item.artist.image == null) {
                return AppConfig.DEFAULT_SONG_IMAGE;
            }
        }
        return item.image ? item.image : item.artist.image;
    }

    private getAlt() {
        return this.appImage.name;
    }

    @HostListener('error', ['$event']) errorHandlerImage($event) {
        const artistInterface = instanseofInterface(this.appImage, 'Artist');
        $event.target.src = artistInterface ? AppConfig.DEFAULT_ARTIST_IMAGE : AppConfig.DEFAULT_SONG_IMAGE;
    }
}
