import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderSearchComponent} from './header-search/header-search.component';
import {HeaderComponent} from './header/header.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {AsideComponent} from './aside/aside.component';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent} from './alert/alert.component';
import {AlertService, CacheService} from '../_services';
import {RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {NgSelectModule} from '@ng-select/ng-select';
import {MyFavoriteComponent} from './my-favorite/my-favorite.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        AlertModule.forRoot()
    ],
    providers: [AlertService, CacheService],
    declarations: [
        HeaderSearchComponent,
        HeaderComponent,
        PlaylistComponent,
        MainMenuComponent,
        AsideComponent,
        AlertComponent,
        MyFavoriteComponent,
    ],
    exports: [
        HeaderSearchComponent,
        HeaderComponent,
        PlaylistComponent,
        MainMenuComponent,
        AsideComponent,
        AlertComponent,
    ]
})
export class ThemeModule {
}
