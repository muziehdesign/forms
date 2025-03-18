import { AfterContentInit, Component, ContentChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FieldSchema } from '../field-schema';
import { MzForm } from '../form/form.directive';
import { FieldMetadata } from '../model-schema';

@Component({
    selector: 'mz-field',
    standalone: true,
    imports: [],
    templateUrl: './field.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class MzField implements AfterContentInit {
    @Input() label?: string;
    @Input() checkbox: boolean = false;
    @Input() schema?: FieldSchema<any>;
    @ContentChild(NgModel) ngModel?: NgModel;

    fieldMetadata?: FieldMetadata;
    constructor(private elementRef: ElementRef, private form: MzForm) {}

    ngAfterContentInit(): void {
        console.log('after init: ', this.elementRef.nativeElement.querySelector('input'));
        this.elementRef.nativeElement.querySelector('input').name = this.ngModel?.path;
        this.fieldMetadata = this.form.schema.getMetadata(this.ngModel?.path || []);
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
