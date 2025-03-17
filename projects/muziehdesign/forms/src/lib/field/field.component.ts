import { AfterContentInit, Component, ContentChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'mz-field',
    standalone: true,
    imports: [],
    templateUrl: './field.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MzField implements AfterContentInit {
    @Input() label?: string;
    @Input() checkbox: boolean = false;
    @ContentChild(NgModel) ngModel?: NgModel;
    constructor(private elementRef: ElementRef) {}

    ngAfterContentInit(): void {
        console.log('after init: ', this.elementRef.nativeElement.querySelector('input'));
        this.elementRef.nativeElement.querySelector('input').name = this.ngModel?.path;
    }

    getErrorMessage(): string | undefined {
        try {
            const list = Object.values(this.ngModel!.errors!);
            return list[0];
        } catch {
            return undefined;
        }
    }
}
