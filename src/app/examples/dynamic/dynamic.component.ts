import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelSchemaFactory, ModelValidator } from '@muziehdesign/forms';
import { FormDirective } from 'src/app/dynamic/form.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { DYNAMIC_FIELDS } from './form-data';
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

    fields = DYNAMIC_FIELDS;
    schema: ModelValidator<{[key: string]: string}>;
    model: {[key: string]: string | undefined};

    constructor(private schemaFactory: ModelSchemaFactory) {
        this.schema = this.schemaFactory.buildUntyped(this.fields);
        this.model = this.schema.instantiate(); 
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