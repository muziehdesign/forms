import { Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgModelGroup } from '@angular/forms';
import { AddressModel } from '../models';
import { MzFormsModule } from '@muziehdesign/forms';

@Component({
    selector: 'app-mailing-address',
    templateUrl: './mailing-address.component.html',
    styleUrls: ['./mailing-address.component.scss'],
    standalone: true,
    imports: [MzFormsModule, FormsModule],
    viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }],
})
export class MailingAddressComponent {
    @Input({ required: true }) model!: AddressModel;

    constructor() {}
}
