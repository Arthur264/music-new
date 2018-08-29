import { TagInterface} from './tag.interface';

export interface ArtistInterface {
    id: number;
    name: string;
    image: string;
    playcount_fm: number;
    listeners_fm: number;
    tag: TagInterface[];
}