import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRouting} from './main.routing';
import {MainComponent} from './main.component';
import {ThemeModule} from '../@theme/theme.module';
import {
    MusicItemComponent,
    MusicPlayerComponent,
    MusicDialogComponent,
    MusicObjectComponent,
    MusicComponent
} from './music/index';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ArtistsComponent} from './artists/artists.component';
import {WidgetModule} from '../widget/widget.module';

@NgModule({
    imports: [
        WidgetModule,
        BsDropdownModule.forRoot(),
        ThemeModule,
        CommonModule,
        MainRouting
    ],
    exports: [MainComponent],
    declarations: [
        MainComponent,
        MusicComponent,
        MusicDialogComponent,
        MusicObjectComponent,
        MusicPlayerComponent,
        MusicItemComponent,
        ArtistsComponent
    ],
    bootstrap: [MainComponent]
})
export class MainModule {
}
