import { JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModelSchemaFactory, FieldError, StringType, required, maxLength, length, pattern, ModelSchema, MzFormsModule, Model, test } from '@muziehdesign/forms';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
    selector: 'app-string',
    imports: [FormsModule, MzFormsModule, JsonPipe, NavbarComponent],
    templateUrl: './string.component.html',
    styleUrls: ['./string.component.scss'],
})
export class StringComponent {
    model: StringExampleModel;
    schema: ModelSchema<StringExampleModel>;
    @ViewChild('checkoutForm', { static: true }) checkoutForm!: NgForm;

    constructor(private factory: ModelSchemaFactory) {
        this.model = new StringExampleModel();
        this.schema = factory.build(this.model);
    }

    usePresetValues() {
        this.model.firstName = 'Tuxedo';
        this.model.code = 'AWRDFX';
        this.model.email = 'tuxedo.mask@moon.com';
    }

    async submitForm() {}

    onValidate(modelErrors: FieldError[], model: StringExampleModel): Promise<FieldError[]> {
        const errors: FieldError[] = [];

        if (this.model.code && this.model.code === 'ABCDE') {
            errors.push({
                type: 'invalid',
                message: 'We do not accept the code ABCDE',
                path: 'code',
            });
        }
        return Promise.resolve([...modelErrors, ...errors]);
    }
}

@Model('StringExampleModel')
export class StringExampleModel {
    @StringType()
    optionalString?: string;

    @StringType(required(), test('customRequiredTest', (value) => value != 'test', 'customRequiredTest'))
    requiredString?: string;

    @StringType(required(), maxLength(9, 'test max length message'))
    firstName?: string;

    @StringType(required(), length(5))
    code?: string;

    @StringType(required(), pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Please enter a valid email address'))
    email?: string;
}
