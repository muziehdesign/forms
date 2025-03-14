import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FieldErrorsComponent } from './field-errors/field-errors.component';
import { MzField } from './field/field.component';
import { MzForm } from './form/form.directive';


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
    MzForm
  ],
  imports: [
    MzField,
    MzForm
  ]
})
export class MzFormsModule { }
