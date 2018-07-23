import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MusicService } from './music/music.service';
import { HttpModule } from '@angular/http';
import { ArtistsComponent } from './artists/artists.component';

@NgModule({
    declarations: [
        AppComponent,
        ArtistsComponent
    ],
    imports: [
        HttpModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([{
            path: '',
            redirectTo: '/music',
            pathMatch: 'full'
        }, {
            path: 'music',
            loadChildren: 'app/music/music.module#MusicModule',
        }, {
            path: 'artists',
            loadChildren: 'app/artists/artists.module#ArtistsModule',
        }])
    ],
    exports: [
        AppComponent,
        ArtistsComponent
    ],
    providers: [AppService, MusicService],
    bootstrap: [AppComponent]
})
export class AppModule {}
