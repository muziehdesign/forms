import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { MzField } from './field.component';
import { DateType, max, min, Model, required, StringType } from '../type-annotations';
import { ModelSchemaFactory } from '../model-schema.factory';
import { MzForm } from '../form/form.directive';
import { ModelSchema } from '../model-schema';

@Model('TestHostModel')
export class TestHostModel {
    @StringType(required())
    textField?: string;

    @DateType(required(), max(new Date('2025-12-31'), 'CustomMaxDateMessage'))
    dateField?: Date;
}

@Component({
    template: `
        <form #testForm="ngForm" (ngSubmit)="submitForm()" mzForm [schema]="schema">
            <mz-field label="textField">
                <input type="text" [(ngModel)]="model.textField" name="textField" />
            </mz-field>
            <mz-field label="dateField">
                <input type="text" [(ngModel)]="model.dateField" name="dateField" />
            </mz-field>
        </form>
    `,
    standalone: false,
})
class TestHostComponent {
    model = new TestHostModel();
    schema: ModelSchema<TestHostModel>;
    @ViewChild('testForm') form!: NgForm;

    constructor(private schemaFactory: ModelSchemaFactory) {
        this.schema = this.schemaFactory.build(this.model);
    }

    async submitForm() {
        await this.schema.validate(this.model);
    }
}

describe('MzField', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [MzField, FormsModule, MzForm],
            providers: [ModelSchemaFactory],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should display default field errors', async () => {
        // Get the input elements
        const textInput = fixture.nativeElement.querySelector('input[name="textField"]') as HTMLInputElement;
        const dateInput = fixture.nativeElement.querySelector('input[name="dateField"]') as HTMLInputElement;

        // Simulate user interaction by focusing and blurring the inputs (which marks them as touched)
        textInput.focus();
        textInput.dispatchEvent(new Event('blur'));
        dateInput.focus();
        dateInput.dispatchEvent(new Event('blur'));

        fixture.detectChanges();
        await fixture.whenStable();

        // Submit the form
        const formElement = fixture.nativeElement.querySelector('form');
        formElement.dispatchEvent(new Event('submit'));

        fixture.detectChanges();
        await fixture.whenStable();

        // Assert that there are two field errors displayed on the page
        const errorElements = fixture.nativeElement.querySelectorAll('.field-error');
        expect(errorElements.length).toBe(2);
        expect(errorElements[0].textContent).toContain('textField is a required field');
        expect(errorElements[1].textContent).toContain('dateField is a required field');
    });

    it('should display custom error message', async () => {
        // Get the date input element
        const dateInput = fixture.nativeElement.querySelector('input[name="dateField"]') as HTMLInputElement;

        // Enter a date that exceeds the max (2025-12-31)
        dateInput.value = '1/1/2030';
        dateInput.dispatchEvent(new Event('input'));
        dateInput.dispatchEvent(new Event('blur'));

        fixture.detectChanges();
        await fixture.whenStable();

        // Submit the form
        const formElement = fixture.nativeElement.querySelector('form');
        formElement.dispatchEvent(new Event('submit'));

        fixture.detectChanges();
        await fixture.whenStable();

        // Assert that the custom max date message is displayed
        const errorElements = fixture.nativeElement.querySelectorAll('.field-error');
        expect(errorElements.length).toBe(2);
        expect(errorElements[0].textContent).toContain('textField is a required field');
        expect(errorElements[1].textContent).toContain('CustomMaxDateMessage');
    });
});
