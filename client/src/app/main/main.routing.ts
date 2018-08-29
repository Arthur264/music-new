import { Routes, RouterModule } from '@angular/router';

const MainRoutes: Routes = [{
        path: 'music',
        loadChildren: 'app/main/music/music.module#MusicModule',
    }, {
        path: 'artists',
        loadChildren: 'app/main/artists/artists.module#ArtistsModule',
    }
];

export const Routing = RouterModule.forRoot(MainRoutes);
