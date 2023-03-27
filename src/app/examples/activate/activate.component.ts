import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgFormModelState, ModelSchemaFactory, NgFormModelStateFactory, FieldError } from '@muziehdesign/forms';
import { ActivateModel } from 'src/app/models';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements AfterViewInit {

  model: ActivateModel;
  modelState!: NgFormModelState<ActivateModel>;
  @ViewChild('checkoutForm', {static: true}) checkoutForm!: NgForm;

  constructor(private factory: ModelSchemaFactory, private modelStateFactory: NgFormModelStateFactory) {
    this.model = new ActivateModel();
  }
  ngAfterViewInit(): void {
    this.modelState = this.modelStateFactory.create(this.checkoutForm, this.model, { onValidate: (errors) => this.onValidate(errors, this.model) });
  }

  usePresetValues() {
    this.model.firstName = 'Tuxedo';
    this.model.lastName = 'Mask'
    this.model.active = true;
  }

  async checkout() {
    console.log('checking out');
    await this.modelState.validate();
  }

  onValidate(modelErrors: FieldError[], model: ActivateModel): Promise<FieldError[]> {
    const errors: FieldError[] = [];

    return Promise.resolve([...modelErrors, ...errors]);
  }
}
