import {SongInterface} from './song.interface';

export interface PlaylistInterface {
    id: number;
    name: string;
    song: SongInterface[];
}