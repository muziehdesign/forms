import { Component } from '@angular/core';
import { ArrayExampleModel } from './model';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FieldOption, MzCheckboxGroupComponent } from '@muziehdesign/forms';

@Component({
    selector: 'app-array',
    standalone: true,
    imports: [MzCheckboxGroupComponent, FormsModule, JsonPipe],
    templateUrl: './array.component.html',
    styleUrl: './array.component.scss',
})
export class ArrayComponent {
    numberOptions: FieldOption[] = [
        {
            label: '1',
            value: 1,
        },
        {
            label: '2',
            value: 2,
        },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
    ];

    model = new ArrayExampleModel();

    preset() {
        this.model.numbers = [3, 4];
    }

    onNumbersChanged(e: any) {
        console.log('numbers changed', e);
    }
}
