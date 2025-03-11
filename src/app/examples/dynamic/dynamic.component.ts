import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrayTypeAnnotations, BooleanTypeAnnotations, ConstraintAnnotations, ConstraintType, ModelSchemaFactory, ModelValidator, StringTypeAnnotations } from '@muziehdesign/forms';
import { FormDirective } from 'src/app/dynamic/form.directive';
import { FieldSectionModel, FieldType } from 'src/app/dynamic/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseSchema, object, string } from 'yup';
import { FORM_DATA } from './form-data';
import { JsonPipe } from '@angular/common';
import { FieldComponent } from 'src/app/dynamic/field/field.component';

@Component({
    selector: 'app-dynamic',
    standalone: true,
    imports: [SharedModule, FormDirective, FormsModule, FieldComponent, JsonPipe],
    templateUrl: './dynamic.component.html',
    styleUrl: './dynamic.component.scss',
})
export class DynamicComponent {

    schema: ModelValidator<{[key: string]: string}>;
    model: {[key: string]: string | undefined};

    constructor(private schemaFactory: ModelSchemaFactory) {
        this.schema = this.buildForm(FORM_DATA.sections);
        this.model = this.schema.instantiate(); 
    }

    buildForm(sections: FieldSectionModel[]) {
        let schema: Map<string, ConstraintAnnotations> = new Map();
        sections.forEach((section) =>
            section.fields.forEach((field) => {
                if (field.type === FieldType.Checkbox) {
                    const constraint = { required: { required: field.required }, constraintType: ConstraintType.boolean  } satisfies BooleanTypeAnnotations;
                    schema.set(`field${field.fieldId}`, constraint);
                } else if(field.type === FieldType.MultiSelect) {
                    const constraint = { constraintType: ConstraintType.array } satisfies ArrayTypeAnnotations;
                    schema.set(`field${field.fieldId}`, constraint);
                } 
                else {
                    const constraint = { required: {required: field.required }, constraintType: ConstraintType.string } satisfies StringTypeAnnotations;
                    schema.set(`field${field.fieldId}`, constraint);
                }
            })
        );

        return this.schemaFactory.buildUntyped(schema);
    }

    submitForm() {
        console.log('submitted', this.model);
    }
}


export const multiply = () => {
    console.log('multiply');
    return 3;
}

export const DATA = multiply();