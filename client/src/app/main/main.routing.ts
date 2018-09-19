import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {MusicComponent} from './music/music.component';
import {ArtistsComponent} from './artists/artists.component';
import {PlaylistPageComponent} from './playlist-page/playlist-page.component';
import {PlaylistPageDetailsComponent} from './playlist-page/playlist-page-details/playlist-page-details.component';

const MainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'music',
                component: MusicComponent,
            }, {
                path: 'music/:id',
                component: MusicComponent,
            }, {
                path: 'artists',
                component: ArtistsComponent,
            }, {
                path: 'playlist',
                component: PlaylistPageComponent,
            }, {
                path: 'playlist/:slug',
                component: PlaylistPageDetailsComponent,
            }
        ]
    }
];

export const MainRouting = RouterModule.forChild(MainRoutes);
