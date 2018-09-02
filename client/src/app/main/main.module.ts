import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRouting} from './main.routing';
import {MainComponent} from './main.component';
import {ThemeModule} from '../@theme/theme.module';
import {MusicModule} from './music/music.module';
import {ArtistsModule} from './artists/artists.module';

@NgModule({
    imports: [
        ThemeModule,
        CommonModule,
        MusicModule,
        ArtistsModule,
        MainRouting
    ],
    exports: [MainComponent],
    declarations: [MainComponent],
    bootstrap: [MainComponent]
})
export class MainModule {
}
