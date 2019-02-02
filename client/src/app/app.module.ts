import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AccountService, AppService, PlayerService, RouterService, SongService} from './_services';
import {AuthInterceptor} from './_interceptors';
import {Routing} from './app.routing';
import {AuthGuard} from './_guards';
import {HttpModule} from '@angular/http';
import './app.declare';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        HttpClientModule,
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
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
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
