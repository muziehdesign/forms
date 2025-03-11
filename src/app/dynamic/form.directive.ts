import { AfterViewInit, Directive, HostListener, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModelValidator, NgFormModelState, NgFormModelStateFactory } from '@muziehdesign/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Directive({
    selector: '[mzForm]',
    standalone: true,
})
export class FormDirective implements AfterViewInit {
    @Input({ required: true }) schema!: ModelValidator<unknown>;

    private modelState!: NgFormModelState<unknown>;

    constructor(private ngForm: NgForm) {

    }
    
    ngAfterViewInit(): void {
        console.log('this is form directive', this.ngForm.value, this.schema);
        this.modelState = new NgFormModelState(this.ngForm, this.schema);
    }

    @HostListener('submit', ['$event'])
    onSubmit(event: Event) {
        console.log('submitting');
        this.ngForm.form.markAllAsTouched();
        if(this.ngForm.invalid) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
}
