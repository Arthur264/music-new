import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRouting} from './main.routing';
import {MainComponent} from './main.component';
import {ThemeModule} from '../@theme/theme.module';
import {MusicComponent} from './music/music.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ArtistsComponent} from './artists/artists.component';
import {WidgetModule} from '../widget/widget.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {SearchComponent} from './search/search.component';
import {PlaylistPageComponent} from './playlist-page/playlist-page.component';
import {PlaylistPageDetailsComponent} from './playlist-page/playlist-page-details/playlist-page-details.component';

@NgModule({
    imports: [
        WidgetModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        BsDropdownModule.forRoot(),
        ThemeModule,
        CommonModule,
        MainRouting
    ],
    exports: [MainComponent],
    declarations: [
        MainComponent,
        MusicComponent,
        ArtistsComponent,
        SearchComponent,
        PlaylistPageComponent,
        PlaylistPageDetailsComponent
    ],
    bootstrap: [MainComponent]
})
export class MainModule {
}
