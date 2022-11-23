import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FieldError, ModelSchemaFactory, NgFormModelState, NgFormModelStateFactory } from '@muziehdesign/forms';
import { AddressModel, CheckoutModel } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  model:CheckoutModel;
  @ViewChild('checkoutForm', {static: true}) checkoutForm!: NgForm;
  modelState!: NgFormModelState<CheckoutModel>;
  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new CheckoutModel();
    this.model.address = new AddressModel();

    //this.model.date = new Date();
  }
  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.checkoutForm, this.model, { onValidate: (errors) => this.onValidate(errors, this.model) });
  }

  async checkout() {
    console.log('checking out');
    await this.modelState.validate();
  }

  onValidate(errors: FieldError[], model: CheckoutModel):FieldError[] {
    if (errors.findIndex(e => e.path === 'instructions') !== -1) {
      return errors;
    }

    return [...errors, {
      path: 'instructions',
      type: 'custom',
      message: 'cannot contain number 7'
    }];
  }

  onAccept(value: string) {
    if (!value) {
      this.model.annualIncome = undefined;
    }
    console.log("VALUE ", value)
  }
}
