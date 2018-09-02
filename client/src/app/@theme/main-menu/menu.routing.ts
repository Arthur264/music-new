import {MenuItem} from '../../_interfaces/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
    {
        name: 'What\'s new',
        routerLink: '#',
        icon: 'icon-disc'
    }, {
        name: 'Genres',
        routerLink: 'dashboard/music',
        icon: 'icon-music-tone-alt'
    }, {
        name: 'Listen',
        routerLink: 'dashboard/artists',
        icon: 'icon-list'
    }
];
