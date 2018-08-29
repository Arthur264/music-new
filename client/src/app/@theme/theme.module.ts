import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderSearchComponent, HeaderComponent],
  exports: [HeaderSearchComponent, HeaderComponent]
})
export class ThemeModule { }
