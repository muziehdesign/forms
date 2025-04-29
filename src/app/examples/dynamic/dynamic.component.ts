import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelSchemaFactory, ModelSchema, MzFormsModule } from '@muziehdesign/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DYNAMIC_FIELDS } from './form-data';
import { JsonPipe } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { ChildPartialFormComponent } from './child-partial-form/child-partial-form.component';

@Component({
    selector: 'app-dynamic',
    imports: [SharedModule, FormsModule, MzFormsModule, JsonPipe, NavbarComponent, ChildPartialFormComponent],
    templateUrl: './dynamic.component.html',
    styleUrl: './dynamic.component.scss'
})
export class DynamicComponent {

    fields = DYNAMIC_FIELDS;
    schema: ModelSchema<unknown>;
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