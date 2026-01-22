
import { CommonModule, JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModelSchemaFactory, NgFormModelStateFactory, FieldError, DateType, min, required, test, MzField, Model, ModelSchema, MzFormsModule } from '@muziehdesign/forms';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
    selector: 'app-date',
    imports: [NavbarComponent, FormsModule, JsonPipe, CommonModule, MzField, MzFormsModule],
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss']
})
export class DateComponent {

  model: CalendarModel;
  schema: ModelSchema<CalendarModel>;
  @ViewChild('checkoutForm', {static: true}) checkoutForm!: NgForm;

  dateModel?: Date;

  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new CalendarModel();
    this.schema = this.factory.build(this.model);
  }

  usePresetValues() {
    this.model.birthDate = new Date();
    this.dateModel = new Date();
  }

  async checkout() {
    this.checkoutForm.form.markAllAsTouched();
    await this.schema.validate(this.model);
  }

  onValidate(modelErrors: FieldError[], model: CalendarModel): Promise<FieldError[]> {
    const errors: FieldError[] = [];

    return Promise.resolve([...modelErrors, ...errors]);
  }
}

@Model('CalendarModel')
export class CalendarModel {
  @DateType(required(),
    test('minimumAge', (d: Date) => {return Number(+new Date().getFullYear() - +d?.getFullYear()) >= 18;}),
    min(new Date(1900, 0, 1)))
  birthDate?: Date;
}
