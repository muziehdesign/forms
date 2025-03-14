import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelSchemaFactory, ModelValidator, MzFormsModule } from '@muziehdesign/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DYNAMIC_FIELDS } from './form-data';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-dynamic',
    standalone: true,
    imports: [SharedModule, FormsModule, MzFormsModule, JsonPipe],
    templateUrl: './dynamic.component.html',
    styleUrl: './dynamic.component.scss',
})
export class DynamicComponent {

    fields = DYNAMIC_FIELDS;
    schema: ModelValidator<unknown>;
    model: {[key: string]: any } = {'Boolean': 'false'};

    constructor(private schemaFactory: ModelSchemaFactory) {
        this.schema = this.schemaFactory.buildUntyped(this.fields);
    }

    submitForm() {
        console.log('submitted');
    }
}


export const multiply = () => {
    console.log('multiply');
    return 3;
}

export const DATA = multiply();