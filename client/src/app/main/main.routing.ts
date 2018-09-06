import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {MusicComponent} from './music/music.component';
import {ArtistsComponent} from './artists/artists.component';

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
            },
            {
                path: 'artists',
                component: ArtistsComponent,
            }
        ]
    }
];

export const MainRouting = RouterModule.forChild(MainRoutes);
