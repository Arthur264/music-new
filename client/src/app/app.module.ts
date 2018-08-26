import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MusicService } from './music/music.service';
import { HttpModule } from '@angular/http'; 
import { ThemeModule } from './@theme/theme.module'; 

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ThemeModule,
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
        },{
            path: 'account',
            loadChildren: 'app/account/account.module#AccountModule',
        }, {
            path: 'artists',
            loadChildren: 'app/artists/artists.module#ArtistsModule',
        }]),
    ],
    exports: [
        AppComponent
    ],
    providers: [AppService, MusicService],
    bootstrap: [AppComponent]
})
export class AppModule {}
