import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelSchemaFactory, ModelValidator } from '@muziehdesign/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DYNAMIC_FIELDS } from './form-data';
import { JsonPipe } from '@angular/common';
import { MzFormsModule } from 'projects/muziehdesign/forms/src/public-api';

@Component({
    selector: 'app-dynamic',
    standalone: true,
    imports: [SharedModule, FormsModule, MzFormsModule, JsonPipe],
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