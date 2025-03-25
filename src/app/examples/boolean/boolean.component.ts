import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFormModelState, ModelSchemaFactory, NgFormModelStateFactory, FieldError, BooleanType, equals, required, StringType, MzFormsModule } from '@muziehdesign/forms';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss'],
  standalone: true,
  imports: [MzFormsModule, FormsModule, JsonPipe, NavbarComponent]
})
export class BooleanComponent implements AfterViewInit {

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

export class ActivateModel {
  @BooleanType(required('Value is required'), equals(true, 'Activate must be true/checked'))
  active?: boolean;
}
