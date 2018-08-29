import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { InvalidmessageDirective } from './_directives/invalidmessage.directive';
import { InvalidTypeDirective } from './_directives/invalid-type.directive'; 

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaginationComponent, InvalidmessageDirective, InvalidTypeDirective],
  exports: [PaginationComponent, InvalidmessageDirective, InvalidTypeDirective]
})
export class WidgetModule { }
