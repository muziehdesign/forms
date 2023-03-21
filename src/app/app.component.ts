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

  usePresetValues() {
    this.model.instructions = 'instructions';
    this.model.date = new Date(1975, 7, 7);
    // this.model.totalCost = 35000; TODO: imask flaw
    this.model.address!.city = 'South Jordan';
    this.model.address!.street1 = 'Street 1';
    this.model.address!.street2 = 'Street 2';
    this.model.address!.state = 'UT';
  }

  async checkout() {
    console.log('checking out');
    await this.modelState.validate();
  }

  onValidate(errors: FieldError[], model: CheckoutModel): Promise<FieldError[]> {
    if (errors.findIndex(e => e.path === 'instructions') !== -1) {
      return Promise.resolve(errors)
    }

    return Promise.resolve([...errors, {
      path: 'instructions',
      type: 'custom',
      message: 'cannot contain number 7'
    }]);
  }
}
