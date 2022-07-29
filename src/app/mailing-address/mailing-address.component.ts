import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddressModel } from '../models';

@Component({
  selector: 'app-mailing-address',
  templateUrl: './mailing-address.component.html',
  styleUrls: ['./mailing-address.component.scss']
})
export class MailingAddressComponent {
  @ViewChild('mailingAddressForm') mailingAddressForm!: NgForm;
  @Input() model: AddressModel;

  constructor() {
    this.model = new AddressModel();
  }
}
