import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination/pagination.component';
import {InvalidmessageDirective, InvalidTypeDirective} from '../_directives';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [PaginationComponent, InvalidTypeDirective, InvalidmessageDirective],
    exports: [PaginationComponent, InvalidTypeDirective, InvalidmessageDirective]
})
export class WidgetModule {
}
