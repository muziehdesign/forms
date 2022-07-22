import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FieldError, ModelSchemaFactory, ModelValidator, NgFormModelState, NgFormModelStateFactory } from '@muziehdesign/forms';
import { CheckoutModel } from './models';

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
  }
  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.checkoutForm, this.model, { validateCallback: this.performAdditionalValidation });
  }

  async checkout() {
    console.log('checking out');
    await this.modelState.validate();
  }

  performAdditionalValidation():FieldError[] {
    return [{
      path: 'instructions',
      type: 'custom',
      message: 'my custom error'
    }];
  }
}
