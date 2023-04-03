
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgFormModelState, ModelSchemaFactory, NgFormModelStateFactory, FieldError, DateType, min, required, StringType, test } from '@muziehdesign/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements AfterViewInit {

  model: CalendarModel;
  modelState!: NgFormModelState<CalendarModel>;
  @ViewChild('checkoutForm', {static: true}) checkoutForm!: NgForm;

  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new CalendarModel();
  }
  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.checkoutForm, this.model, { onValidate: (errors) => this.onValidate(errors, this.model) });
  }

  usePresetValues() {
    this.model.birthDate = new Date();
  }

  async checkout() {
    console.log('checking out');
    await this.modelState.validate();
  }

  onValidate(modelErrors: FieldError[], model: CalendarModel): Promise<FieldError[]> {
    const errors: FieldError[] = [];

    return Promise.resolve([...modelErrors, ...errors]);
  }
}

export class CalendarModel {
  @DateType(required(), test('minimumAge', (d: Date) => {return Number(+new Date().getFullYear() - +d?.getFullYear()) >= 18;}, 'You must be over 18'), min(new Date(1900, 0, 1), 'Minimum date is 01/01/1900'))
  birthDate?: Date;
}
