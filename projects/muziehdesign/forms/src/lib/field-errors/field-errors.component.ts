import { Component, Input } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'mz-field-errors',
    templateUrl: './field-errors.component.html',
    styleUrls: ['./field-errors.component.css'],
    standalone: false
})
export class FieldErrorsComponent {
  @Input() field?: NgControl;

  get errorMessage(): string {
    const errorKeys = Object.keys(this.field?.errors || {});
    return errorKeys.length > 0 ? (this.field?.errors as ValidationErrors)[errorKeys[0]] : '';
  }
}
