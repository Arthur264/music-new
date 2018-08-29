import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';

const AppRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: 'app/main/main.module#MainModule',
    }, {
        path: 'account',
        loadChildren: 'app/account/account.module#AccountModule',
    }
];

export const Routing = RouterModule.forRoot(AppRoutes);
