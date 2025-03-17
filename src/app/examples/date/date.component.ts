
import { CommonModule, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFormModelState, ModelSchemaFactory, NgFormModelStateFactory, FieldError, DateType, min, required, StringType, test, DateValueAccessor, FieldErrorsComponent } from '@muziehdesign/forms';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { FormsModule as MuziehFormsModule } from '@muziehdesign/forms';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [DateValueAccessor, NavbarComponent, FormsModule, JsonPipe, MuziehFormsModule, CommonModule],
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements AfterViewInit {

  model: CalendarModel;
  modelState!: NgFormModelState<CalendarModel>;
  @ViewChild('checkoutForm', {static: true}) checkoutForm!: NgForm;

  dateModel?: Date;

  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new CalendarModel();
  }
  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.checkoutForm, this.model, { onValidate: (errors) => this.onValidate(errors, this.model) });
  }

  usePresetValues() {
    this.model.birthDate = new Date();
    this.dateModel = new Date();
  }

  async checkout() {
    this.checkoutForm.form.markAllAsTouched();
    console.log('checking out');
    console.log(this.dateModel?.toISOString());
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
