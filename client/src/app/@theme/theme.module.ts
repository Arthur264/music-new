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
import {AlertService} from '../_services/alert.service';
import {RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {CacheService} from '../_services/cache.service';
import {NgSelectModule} from '@ng-select/ng-select';

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
    declarations: [HeaderSearchComponent, HeaderComponent, PlaylistComponent, MainMenuComponent, AsideComponent, AlertComponent],
    exports: [HeaderSearchComponent, HeaderComponent, PlaylistComponent, MainMenuComponent, AsideComponent, AlertComponent]
})
export class ThemeModule {
}
