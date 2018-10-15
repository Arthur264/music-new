import {TagInterface} from './tag.interface';
import {BaseInterface} from './base.interface';

export interface ArtistInterface extends BaseInterface {
    type: 'artist';
    id: number;
    name: string;
    image: string;
    playcount_fm: number;
    listeners_fm: number;
    tag: TagInterface[];
}