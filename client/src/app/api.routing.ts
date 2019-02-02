export class ApiRouting{
    static user_me = 'user/me';
    static user = 'user';
    static user_avatar = 'user/me/avatar';
    static user_social_link = 'user/me/social_link';

    static change_password = 'auth/change-password';

    static song_add_play = 'song/{0}/addplay';
    static song_hidden = 'song/{0}/hidden';

    static auth_login = 'auth/login';
    static auth_logout = 'auth/logout';
}