import {ArtistInterface} from './artist.interface';
import {BaseInterface} from './base.interface';

export interface SongInterface extends BaseInterface {
    type: 'song';
    id: number;
    name: string;
    image: string;
    listeners_fm: string;
    artist: ArtistInterface;
    url: string;
    preload: string;
    favorite: boolean;
    play?: boolean;
}
