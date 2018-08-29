import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';

const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: '/music',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }, {
        path: 'music',
        loadChildren: 'app/main/music/music.module#MusicModule',
        canActivate: [AuthGuard]
    }, {
        path: 'account',
        loadChildren: 'app/account/account.module#AccountModule',
        data: {
            component: 'account'
        }
    }, {
        path: 'artists',
        loadChildren: 'app/main/artists/artists.module#ArtistsModule',
        canActivate: [AuthGuard]
    }
];

export const Routing = RouterModule.forRoot(AppRoutes);
