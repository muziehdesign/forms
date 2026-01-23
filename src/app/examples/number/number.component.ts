import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelSchemaFactory, MzFormsModule, ModelSchema } from '@muziehdesign/forms';
import { NumberExampleModel } from './number-example.model';
import { JsonPipe } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
    selector: 'app-number',
    templateUrl: './number.component.html',
    styleUrls: ['./number.component.scss'],
    imports: [MzFormsModule, FormsModule, JsonPipe, NavbarComponent],
    standalone: true
})
export class NumberComponent {

    model: NumberExampleModel;
    schema: ModelSchema<NumberExampleModel>;

    constructor(private factory: ModelSchemaFactory, private schemaFactory: ModelSchemaFactory) {
        this.model = new NumberExampleModel();
        this.schema = this.schemaFactory.build(this.model);
    }

    usePresetValues() {
        this.model.requiredNumber = 5;
        this.model.optionalNumber = undefined;
    }

    async submitForm() {
        await this.schema.validate(this.model);
    }
}
