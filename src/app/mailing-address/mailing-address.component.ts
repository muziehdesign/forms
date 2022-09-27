import { Component, Input } from '@angular/core';
import { ControlContainer, NgModelGroup } from '@angular/forms';
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
