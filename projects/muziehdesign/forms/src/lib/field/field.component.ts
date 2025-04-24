import { AfterContentInit, Component, ContentChild, ElementRef, Input, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, NgForm, NgModel, NgModelGroup } from '@angular/forms';
import { FieldSchema } from '../field-schema';
import { FieldMetadata } from '../model-schema';

function getControlContainer(
    group: NgModelGroup | null,
    form: NgForm | null
  ): ControlContainer {
    console.log('getControlContainer', group, form);
    return group ?? form!;
  }

@Component({
    selector: 'mz-field',
    standalone: true,
    imports: [],
    templateUrl: './field.component.html',
    providers: [
        {
          provide: ControlContainer,
          useFactory: getControlContainer,
          deps: [[new Optional(), new SkipSelf(), NgModelGroup], [new Optional(), new SkipSelf(), NgForm]]
        }
      ]
})
export class MzField implements AfterContentInit {
    @Input() label?: string;
    @Input() controlType: 'checkbox' | 'checkboxgroup' | 'other' = 'other';
    @Input() schema?: FieldSchema<any>;
    @ContentChild(NgModel) ngModel?: NgModel;

    fieldMetadata?: FieldMetadata;
    constructor(private elementRef: ElementRef) {
    }

    ngAfterContentInit(): void {
        //this.fieldMetadata = this.form.schema.getMetadata(this.ngModel?.path || []);
    }

    getErrorMessage(): string | undefined {
        try {
            const list = Object.values(this.ngModel!.errors!);
            return list[0];
        } catch {
            return undefined;
        }
    }
}
