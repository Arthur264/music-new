import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';

const MainRoutes: Routes = [
    {
        path: '',
        redirectTo: '/music',
        pathMatch: 'full',
        component: MainComponent
    }, {
        path: 'music',
        loadChildren: 'app/main/music/music.module#MusicModule',
    }, {
        path: 'artists',
        loadChildren: 'app/main/artists/artists.module#ArtistsModule',
    }
];

export const Routing = RouterModule.forRoot(MainRoutes);
