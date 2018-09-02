import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AppService} from './_services/app.service';
import {AccountService} from './_services/account.service';
import {Routing} from './app.routing';
import {AuthGuard} from './_guards/index';
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
    providers: [AppService, AccountService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
