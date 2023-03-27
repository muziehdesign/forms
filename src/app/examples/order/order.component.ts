import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgFormModelState, ModelSchemaFactory, NgFormModelStateFactory, FieldError } from '@muziehdesign/forms';
import { OrderModel } from 'src/app/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements AfterViewInit {

  model: OrderModel;
  modelState!: NgFormModelState<OrderModel>;
  @ViewChild('checkoutForm', {static: true}) checkoutForm!: NgForm;

  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new OrderModel();
  }
  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.checkoutForm, this.model, { onValidate: (errors) => this.onValidate(errors, this.model) });
  }

  usePresetValues() {
    this.model.firstName = 'Tuxedo';
    this.model.lastName = 'Mask'
    this.model.orderNumber = 1488;
  }

  async checkout() {
    console.log('checking out');
    await this.modelState.validate();
  }

  onValidate(modelErrors: FieldError[], model: OrderModel): Promise<FieldError[]> {
    const errors: FieldError[] = [];

    return Promise.resolve([...modelErrors, ...errors]);
  }
}
