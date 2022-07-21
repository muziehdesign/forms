import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FieldErrorsComponent } from './field-errors/field-errors.component';



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
