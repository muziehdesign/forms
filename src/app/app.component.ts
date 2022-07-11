import { Component } from '@angular/core';
import { CheckoutModel } from './checkout.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model:CheckoutModel;
  constructor() {
    this.model = new CheckoutModel();
  }

  checkout() {
    console.log('checking out', this.model);
  }
}
