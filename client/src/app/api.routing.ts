export class ApiRouting {
    static user_me = 'user/me';
    static user = 'user';
    static user_avatar = 'user/me/avatar';
    static user_social_link = 'user/me/social_link';

    static change_password = 'auth/change-password';

    static song_add_play = 'song/{0}/addplay';
    static song_hidden = 'song/{0}/hidden';

    static artist = 'artist';
    static artist_details = 'artist/{0}';

    static auth_login = 'auth/login';
    static auth_logout = 'auth/logout';

    static tag = 'tag';
    static tag_details = 'tag/{0}';

    static search = 'search';

    static playlist = 'playlist';
    static playlist_details = 'playlist/{0}';
    static playlist_tracks = 'playlist/{0}/tracks';
}