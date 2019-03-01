import './app.declare';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AccountService, AppService, PlayerService, RouterService, SearchService, SongService} from './_services';
import {AuthInterceptor} from './_interceptors';
import {Routing} from './app.routing';
import {AuthGuard} from './_guards';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ConfirmService} from './_services/confirm.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        HttpClientModule,
        FormsModule,
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
        SearchService,
        AuthGuard,
        PlayerService,
        RouterService,
        SongService,
        ConfirmService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
