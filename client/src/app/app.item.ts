export class MusicItem {
    id: number;
    name: string;
    artist: object;
    url: string;
}
export class TagItem {
    id: number;
    name: string;
    slug: string;
}
export class ArtistItem {
    id: number;
    name: string;
    image: string;
    playcount_fm: number;
    listeners_fm: number;
    tag: TagItem[];
    
}