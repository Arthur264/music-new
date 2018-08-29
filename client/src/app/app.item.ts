export interface MusicItem {
    id: number;
    name: string;
    artist: object;
    url: string;
}
export interface TagItem {
    id: number;
    name: string;
    slug: string;
}
export interface ArtistItem {
    id: number;
    name: string;
    image: string;
    playcount_fm: number;
    listeners_fm: number;
    tag: TagItem[];
}

export interface UserItem {
    id: number,
    company?: string,
    username: string,
    email: string,
    first_name?: string,
    last_name?: string,
    address?: string,
    city?: string,
    country?: string,
    postcode?: string,
    description?: string,
}