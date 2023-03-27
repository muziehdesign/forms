
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgFormModelState, ModelSchemaFactory, NgFormModelStateFactory, FieldError } from '@muziehdesign/forms';
import { CalendarModel } from 'src/app/models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {

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
    this.model.firstName = 'Tuxedo';
    this.model.lastName = 'Mask'
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
