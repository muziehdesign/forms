import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export type FieldOption = {
    label: string;
    value: any;
};

@Component({
    selector: 'mz-checkbox-group',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './checkbox-group.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MzCheckboxGroup),
            multi: true,
        },
    ],
})
export class MzCheckboxGroup implements ControlValueAccessor {
    @Input({ required: true }) options!: FieldOption[];
    @Input({ required: false }) disabled = false;

    selections: any[] = [];

    onChange: (value: string[]) => void = () => {};
    onTouched: () => void = () => {};

    // Writes the selected values from the form model
    writeValue(values: any[]): void {
        this.selections = values || [];
    }

    // Registers the onChange function to propagate changes
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // Registers the onTouched function
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // Checks if a checkbox is selected
    isChecked(option: FieldOption): boolean {
        return this.selections.includes(option.value);
    }

    // Handles changes when checkboxes are clicked
    onCheckboxChange(event: Event, option: FieldOption): void {
        const checked = (event.target as HTMLInputElement).checked;

        if (checked) {
            this.selections = [...this.selections, option.value];
        } else {
            this.selections = this.selections.filter((val) => val !== option.value);
        }

        this.onChange(this.selections);
        this.onTouched();
    }
}
