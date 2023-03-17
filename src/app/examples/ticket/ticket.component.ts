import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgFormModelState, ModelSchemaFactory, NgFormModelStateFactory, FieldError } from '@muziehdesign/forms';
import { TicketModel } from 'src/app/models';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements AfterViewInit {

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

  onValidate(modelErrors: FieldError[], model: TicketModel):FieldError[] {
    const errors: FieldError[] = [];

    if (this.model.code && this.model.code === 'ABCDE') {
        errors.push({
            type: 'invalid',
            message: 'We do not accept the code ABCDE',
            path: 'code',
        });
    }
    return [...modelErrors, ...errors];
  }
}
