import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgFormModelState, ModelSchemaFactory, NgFormModelStateFactory, ObjectType, FieldError, max, min, NumberType, required, StringType } from '@muziehdesign/forms';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements AfterViewInit {

  model: OrderModel;
  modelState!: NgFormModelState<OrderModel>;
  @ViewChild('form', {static: true}) form!: NgForm;

  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new OrderModel();
    this.model.address = new AddressModel();
    this.model.address.street1 = "dd"
  }
  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.form, this.model, { onValidate: (errors) => this.onValidate(errors, this.model) });
  }

  usePresetValues() {
    this.model.orderNumber = 500;
    this.model
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

export class AddressModel {
  @StringType(required('Street is required'))
  street1?: string;
  street2?: string;
  @StringType(required('City is required'))
  city?: string;
  @StringType(required('State is required'))
  state?: string;
  @StringType(required('Zipcode is required'))
  zipCode?: string;
}

export class OrderModel {

  @NumberType(required('Please enter a value from 1 to 1000'), min(1), max(1000))
  orderNumber?: number;
  @ObjectType(AddressModel, required())
  address?: AddressModel;
}

