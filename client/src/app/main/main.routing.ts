import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main.component';

const MainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'music',
                loadChildren: 'app/main/music/music.module#MusicModule',
            }, {
                path: 'artists',
                loadChildren: 'app/main/artists/artists.module#ArtistsModule',
            }
        ]
    }
];

export const MainRouting = RouterModule.forChild(MainRoutes);
