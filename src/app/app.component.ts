import { Component } from '@angular/core';
import { ModelSchemaFactory, ModelValidator } from '@muziehdesign/forms';
import { CheckoutModel } from './checkout.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model:CheckoutModel;
  private validator: ModelValidator<CheckoutModel>;
  constructor(private factory: ModelSchemaFactory) {
    this.model = new CheckoutModel();
    this.validator = factory.build(this.model);
  }

  checkout() {
    console.log('checking out', this.model);
    this.validator.validate(this.model).then(e=>{
      console.log('errors', e);
    });
  }
}
