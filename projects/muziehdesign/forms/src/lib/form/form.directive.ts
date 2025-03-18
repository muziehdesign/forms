import { AfterViewInit, Directive, HostListener, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModelSchema } from '../model-schema';
import { NgFormModelState } from '../ngform-model-state';

@Directive({
    selector: '[mzForm]',
    standalone: true,
})
export class MzForm implements AfterViewInit {
    @Input({ required: true }) schema!: ModelSchema<unknown>;

    private modelState!: NgFormModelState<unknown>;

    constructor(private ngForm: NgForm) {

    }
    
    ngAfterViewInit(): void {
        this.modelState = new NgFormModelState(this.ngForm, this.schema);
    }

    @HostListener('submit', ['$event'])
    onSubmit(event: Event) {
        this.ngForm.form.markAllAsTouched();
        if(this.ngForm.invalid) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
}
