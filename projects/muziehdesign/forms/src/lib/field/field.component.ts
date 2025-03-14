import { AfterContentInit, Component, ContentChild, ContentChildren, DestroyRef, Input, QueryList } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'mz-field',
    standalone: true,
    imports: [],
    templateUrl: './field.component.html',
})
export class MzField {
    @Input() label?: string;
    @Input() checkbox: boolean = false;
    @ContentChild(NgModel) ngModel?: NgModel;
    constructor() {}

    getErrorMessage(): string | undefined {
        try {
            const list = Object.values(this.ngModel!.errors!);
            return list[0];
        } catch {
            return undefined;
        }
    }
}
