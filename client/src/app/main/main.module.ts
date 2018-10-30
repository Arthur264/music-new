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
import {SearchComponent} from './search/search.component';
import {PlaylistPageComponent} from './playlist-page/playlist-page.component';
import {PlaylistPageDetailsComponent} from './playlist-page/playlist-page-details/playlist-page-details.component';
import {FavoriteComponent} from './favorite/favorite.component';
import {SongItemComponent} from './music/song-item/song-item.component';
import {SongPlaylistComponent} from './music/song-playlist/song-playlist.component';
import {ProfileComponent} from './profile/profile.component';
import {
    DropzoneModule,
    DropzoneConfigInterface,
    DROPZONE_CONFIG,
} from 'ngx-dropzone-wrapper';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    acceptedFiles: 'image/*',
    createImageThumbnails: true
};

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
        DropzoneModule,
    ],
    exports: [
        MainComponent,
    ],
    declarations: [
        MainComponent,
        MusicComponent,
        ArtistsComponent,
        SearchComponent,
        PlayerComponent,
        PlaylistPageComponent,
        PlaylistPageDetailsComponent,
        SongItemComponent,
        FavoriteComponent,
        SongPlaylistComponent,
        ProfileComponent,
    ],
    bootstrap: [MainComponent],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ]
})
export class MainModule {
}
