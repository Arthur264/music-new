import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination/pagination.component';
import {ImageDirective, InvalidmessageDirective, InvalidTypeDirective} from '../_directives';
import {RemoveHttpPipe} from '../_pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PaginationComponent,
        InvalidTypeDirective,
        InvalidmessageDirective,
        ImageDirective,
        RemoveHttpPipe,
    ],
    exports: [
        PaginationComponent,
        InvalidTypeDirective,
        InvalidmessageDirective,
        ImageDirective,
        RemoveHttpPipe,
    ]
})
export class WidgetModule {
}
