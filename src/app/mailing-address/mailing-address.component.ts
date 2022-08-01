import { Component, Input, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import { AddressModel } from '../models';

@Component({
  selector: 'app-mailing-address',
  templateUrl: './mailing-address.component.html',
  styleUrls: ['./mailing-address.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgModelGroup } ],
})
export class MailingAddressComponent {
  @Input() model!: AddressModel;

  constructor() {}
}
