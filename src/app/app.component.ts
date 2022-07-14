import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModelSchemaFactory, ModelValidator, NgFormModelState, NgFormModelStateFactory } from '@muziehdesign/forms';
import { CheckoutModel } from './checkout.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  model:CheckoutModel;
  @ViewChild('checkoutForm', {static: true}) checkoutForm!: NgForm;
  private validator: ModelValidator<CheckoutModel>;
  modelState!: NgFormModelState<CheckoutModel>;
  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new CheckoutModel();
    this.validator = factory.build(this.model);
  }
  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.checkoutForm, this.model);
  }

  checkout() {
    console.log('checking out');
    this.modelState.validate();
  }
}
