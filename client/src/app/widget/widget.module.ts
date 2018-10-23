import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination/pagination.component';
import {ImageDirective, InvalidmessageDirective, InvalidTypeDirective} from '../_directives';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PaginationComponent,
        InvalidTypeDirective,
        InvalidmessageDirective,
        ImageDirective,
    ],
    exports: [
        PaginationComponent,
        InvalidTypeDirective,
        InvalidmessageDirective,
        ImageDirective,
    ]
})
export class WidgetModule {
}
