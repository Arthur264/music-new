import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ControlContainer, FormGroupDirective} from '@angular/forms';

@Directive({
    selector: '[invalidmessage]'
})
export class InvalidmessageDirective implements OnInit, OnDestroy {

    @Input() invalidmessage: string;
    control: any;
    hasView = false;
    controlValue$: Observable<any>;
    controlSubscription: Subscription;
    hasSubmitted: boolean;

    constructor(private _fg: ControlContainer,
                private _el: ElementRef,
                private render: Renderer2) {
    }

    get form() {
        return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null;
    }

    ngOnInit() {
        this.control = this.form.get(this.invalidmessage);
        let formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit.map(() => {
            this.hasSubmitted = true;
        });
        this.controlValue$ = Observable.merge(this.control.valueChanges, Observable.of(''), formSubmit$);
        this.controlSubscription = this.controlValue$.subscribe(() => {
            this.setVisible();
        });

    }

    match(error: string) {
        if (this.control && this.control.errors) {
            if (Object.keys(this.control.errors).indexOf(error) > -1) {
                return 'errorMessages' in this.control ? this.control.errorMessages[0] : true;
            }
        }
        return false;
    }

    ngOnDestroy() {
        if (this.controlSubscription) {
            this.controlSubscription.unsubscribe();
        }
    }

    private setVisible() {
        if (this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
            this.render.removeStyle(this._el.nativeElement, 'display');
        } else {
            this.render.setStyle(this._el.nativeElement, 'display', 'none');
        }
    }

}
