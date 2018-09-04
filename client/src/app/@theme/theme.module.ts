import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderSearchComponent} from './header-search/header-search.component';
import {HeaderComponent} from './header/header.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {AsideComponent} from './aside/aside.component';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent} from './alert/alert.component';
import {AlertModule} from 'ngx-bootstrap';
import {AlertService} from '../_services/alert.service';
import {RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        AlertModule.forRoot()
    ],
    providers: [AlertService],
    declarations: [HeaderSearchComponent, HeaderComponent, PlaylistComponent, MainMenuComponent, AsideComponent, AlertComponent],
    exports: [HeaderSearchComponent, HeaderComponent, PlaylistComponent, MainMenuComponent, AsideComponent, AlertComponent]
})
export class ThemeModule {
}
