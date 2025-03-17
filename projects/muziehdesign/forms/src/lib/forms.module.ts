import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FieldErrorsComponent } from './field-errors/field-errors.component';
import { MzField } from './field/field.component';
import { MzForm } from './form/form.directive';
import { DateValueAccessor } from './date-value-accessor.directive';
import { MzCheckboxGroup } from './checkbox-group/checkbox-group.component';


/**
 * @deprecated
 */
@NgModule({
  providers: [],
  declarations: [
    FieldErrorsComponent
  ],
  exports: [
    FieldErrorsComponent
  ],
  imports: [
    CommonModule // TODO: can remove once done with temp error displaying
  ]
})
export class FormsModule { }


@NgModule({
  providers: [],
  exports: [
    MzField,
    MzForm,
    DateValueAccessor,
    MzCheckboxGroup
  ],
  imports: [
    MzField,
    MzForm,
    DateValueAccessor,
    MzCheckboxGroup
  ]
})
export class MzFormsModule { }
