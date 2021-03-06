import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRouting} from './main.routing';
import {MainComponent} from './main.component';
import {ThemeModule} from '../@theme/theme.module';
import {MusicComponent} from './music/music.component';
import {PlayerComponent} from './player/player.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ArtistsComponent} from './artists/artists.component';
import {WidgetModule} from '../widget/widget.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {PlaylistPageComponent} from './playlist-page/playlist-page.component';
import {PlaylistPageDetailsComponent} from './playlist-page/playlist-page-details/playlist-page-details.component';
import {FavoriteComponent} from './favorite/favorite.component';
import {SongItemComponent} from './music/song-item/song-item.component';
import {SongPlaylistComponent} from './music/song-playlist/song-playlist.component';
import {ProfileComponent} from './profile/profile.component';


@NgModule({
    imports: [
        WidgetModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        BsDropdownModule.forRoot(),
        ThemeModule,
        CommonModule,
        MainRouting,
    ],
    exports: [
        MainComponent,
    ],
    declarations: [
        MainComponent,
        MusicComponent,
        ArtistsComponent,
        PlayerComponent,
        PlaylistPageComponent,
        PlaylistPageDetailsComponent,
        SongItemComponent,
        FavoriteComponent,
        SongPlaylistComponent,
        ProfileComponent,
    ],
    bootstrap: [MainComponent],
})
export class MainModule {
}
