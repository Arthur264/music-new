import {MenuItem} from '../../_interfaces/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
    {
        name: 'What\'s new',
        link: '/',
        icon: 'icon-disc'
    }, {
        name: 'Genres',
        link: '/dashboard/music',
        icon: 'icon-music-tone-alt'
    }, {
        name: 'Listen',
        link: '/dashboard/artists',
        icon: 'icon-list'
    }
];
