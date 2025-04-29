import { Component, Input } from '@angular/core';
import { ModelSchema, MzFormsModule } from '@muziehdesign/forms';
import { ControlContainer, FormsModule } from '@angular/forms';
import { DYNAMIC_FIELDS } from '../form-data';

@Component({
    selector: 'app-child-partial-form',
    imports: [MzFormsModule, FormsModule],
    templateUrl: './child-partial-form.component.html',
    styleUrl: './child-partial-form.component.scss'
})
export class ChildPartialFormComponent {
    @Input({ required: true }) schema!: ModelSchema<unknown>;
    @Input({ required: true }) model: { [key: string]: any } = {};
    fields = DYNAMIC_FIELDS.filter((f) => f.name === 'AnotherString');

    constructor(container: ControlContainer) {
        console.log('container:', container);
    }
}
