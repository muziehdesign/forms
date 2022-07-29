import { Component, Input, ViewChild } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { AddressModel } from '../models';

@Component({
  selector: 'app-mailing-address',
  templateUrl: './mailing-address.component.html',
  styleUrls: ['./mailing-address.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
})
export class MailingAddressComponent {
  @ViewChild('mailingAddressForm') mailingAddressForm!: NgForm;
  @Input() model: AddressModel;

  constructor() {
    this.model = new AddressModel();
  }
}
