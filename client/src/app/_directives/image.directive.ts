import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {AppConfig} from '../app.config';
import {ArtistInterface, SongInterface} from '../_interfaces';

@Directive({
    selector: '[appImage]'
})
export class ImageDirective {
    @Input('appImage') imageType: SongInterface | ArtistInterface;

    constructor(private _el: ElementRef) {
        this._el.nativeElement.src = this.getImage(this.imageType);
    }
    private getImage(item) {
        if (item.image == null && !('artist' in item)) {
            return AppConfig.DEFAULT_ARTIST_IMAGE;
        }
        if (item.image == null && item.artist.image == null && 'artist' in item) {
            return AppConfig.DEFAULT_SONG_IMAGE;
        }
        return item.image ? item.image : item.artist.image;
    }
    @HostListener('error', ['$event']) errorHandlerImage($event) {
        $event.target.src = AppConfig.DEFAULT_SONG_IMAGE;
    }
}
