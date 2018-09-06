import {ArtistInterface} from './artist.interface';

export interface SongInterface {
    id: number;
    name: string;
    artist: ArtistInterface;
    url: string;
    preload: string;
}
