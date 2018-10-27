import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AccountService, AppService, PlayerService, RouterService, SongService} from './_services';
import {Routing} from './app.routing';
import {AuthGuard} from './_guards';
import {HttpModule} from '@angular/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        FormsModule,
        HttpModule,
        BrowserModule,
        BrowserAnimationsModule,
        Routing,
    ],
    exports: [
        AppComponent
    ],
    providers: [
        AppService,
        AccountService,
        AuthGuard,
        PlayerService,
        RouterService,
        SongService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
