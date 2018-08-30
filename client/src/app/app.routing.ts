import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';

const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }, {
        path: 'account',
        loadChildren: 'app/account/account.module#AccountModule',
    }, {
        path: 'dashboard',
        loadChildren: 'app/main/main.module#MainModule',
        canActivate: [AuthGuard]
    }
];

export const Routing = RouterModule.forRoot(AppRoutes);
