import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {InvalidmessageDirective} from './invalidmessage.directive';

@Directive({
    selector: '[invalidType]'
})
export class InvalidTypeDirective implements OnInit {

    @Input('invalidType') type: string;
    private hasView = false;

    constructor(
        private invalidmessage: InvalidmessageDirective,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private _el: ElementRef,
    ) {
    }

    ngOnInit() {
        this.invalidmessage.controlValue$.subscribe(() => {
            this.setVisible();
        });
    }

    private setVisible() {
        const math_error = this.invalidmessage.match(this.type);
        if (math_error) {
            if (!this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
                if (typeof math_error === 'string') {
                    this._el.nativeElement.parentElement.innerText = math_error;
                }
            }
        } else {
            if (this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        }
    }

}
