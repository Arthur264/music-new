import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppService } from './_services/app.service';
import { MusicService } from './music/music.service';
import { HttpModule } from '@angular/http'; 
import { ThemeModule } from './@theme/theme.module'; 
import { AccountService } from './_services/account.service';
import { Routing } from './app.routing';
import { AuthGuard } from './_guards/index';
import { MainComponent } from './main/main.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent
    ],
    imports: [
        ThemeModule,
        HttpModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        Routing,
    ],
    exports: [
        AppComponent
    ],
    providers: [AppService, MusicService, AccountService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
