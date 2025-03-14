import { Component, ContentChild, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'mz-checkbox-field',
  standalone: true,
  imports: [],
  templateUrl: './checkbox-field.component.html',
  styleUrl: './checkbox-field.component.scss'
})
export class MzCheckboxField {
  @Input() label?: string;
  @ContentChild(NgModel) ngModel!: NgModel;
  constructor() {}

  getErrorMessage(): string | undefined {
    try {
        const list = Object.values(this.ngModel.errors!);
        return list[0];
    } catch {
        return undefined;
    }
}
}
