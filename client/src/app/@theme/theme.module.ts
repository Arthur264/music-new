import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSearchComponent } from './header-search/header-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderSearchComponent],
  exports: [HeaderSearchComponent]
})
export class ThemeModule { }
