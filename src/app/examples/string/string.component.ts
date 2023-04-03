import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgFormModelState, ModelSchemaFactory, NgFormModelStateFactory, FieldError, StringType, required, maxLength, length, pattern } from '@muziehdesign/forms';

@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent implements AfterViewInit {

  model:TicketModel;
  modelState!: NgFormModelState<TicketModel>;
  @ViewChild('checkoutForm', {static: true}) checkoutForm!: NgForm;

  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new TicketModel();
  }
  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.checkoutForm, this.model, { onValidate: (errors) => this.onValidate(errors, this.model) });
  }

  usePresetValues() {
    this.model.firstName = 'Tuxedo';
    this.model.lastName = 'Mask'
    this.model.code = 'AWRDFX';
    this.model.email = 'tuxedo.mask@moon.com';
  }

  async checkout() {
    console.log('checking out');
    await this.modelState.validate();
  }

  onValidate(modelErrors: FieldError[], model: TicketModel): Promise<FieldError[]> {
    const errors: FieldError[] = [];

    if (this.model.code && this.model.code === 'ABCDE') {
        errors.push({
            type: 'invalid',
            message: 'We do not accept the code ABCDE',
            path: 'code',
        });
    }
    return Promise.resolve([...modelErrors, ...errors]);
  }
}


export class TicketModel {
  @StringType(required('Please enter first name'), maxLength(9, 'Name cannot be more than 9 characters'))
  firstName?: string;

  @StringType(required('Please enter last name'))
  lastName?: string;

  @StringType(required('Please enter first name'), length(5, 'Please enter ticket verification code'))
  code?: string;

  @StringType(required('Please enter email'), pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Please enter a valid email address'))
  email?: string;
}
