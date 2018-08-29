import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { HeaderComponent } from './header/header.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderSearchComponent, HeaderComponent, PlaylistComponent, MainMenuComponent],
  exports: [HeaderSearchComponent, HeaderComponent, PlaylistComponent, MainMenuComponent]
})
export class ThemeModule { }
