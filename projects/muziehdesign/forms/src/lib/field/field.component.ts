import { Component, ContentChild, Input, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, NgForm, NgModel, NgModelGroup } from '@angular/forms';
import { FormMessageService } from '../form-message.service';
import { MzForm } from '../../public-api';

function getControlContainer(group: NgModelGroup | null, form: NgForm | null): ControlContainer {
    return group ?? form!;
}

@Component({
    selector: 'mz-field',
    imports: [],
    templateUrl: './field.component.html',
    providers: [
        {
            provide: ControlContainer,
            useFactory: getControlContainer,
            deps: [
                [new Optional(), new SkipSelf(), NgModelGroup],
                [new Optional(), new SkipSelf(), NgForm],
            ],
        },
    ],
})
export class MzField {
    @Input() label?: string;
    @Input() controlType: 'checkbox' | 'checkboxgroup' | 'other' = 'other';
    @ContentChild(NgModel) ngModel?: NgModel;

    constructor(private message: FormMessageService, @Optional() private form?: MzForm) {}

    getErrorMessage(): string | undefined {
        try {
            const list = Object.values(this.ngModel!.errors!);
            return this.message.getMessage(list[0], this.form?.schema.name);
        } catch {
            return undefined;
        }
    }
}
