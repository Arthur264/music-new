import {ArtistInterface} from './artist.interface';

export interface SongInterface {
    id: number;
    name: string;
    image: string;
    listeners_fm: string;
    artist: ArtistInterface;
    url: string;
    preload: string;
}
