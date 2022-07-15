import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgForm, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, filter, from, switchMap } from 'rxjs';
import { FieldError } from './field-error';
import { ModelSchemaFactory } from './model-schema.factory';
import { ModelValidator } from './model-validator';

@Injectable({
  providedIn: 'root',
})
export class NgFormModelStateFactory {
  constructor(private factory: ModelSchemaFactory) {}

  create<T>(form: NgForm, model: T) {
    const modelState = new NgFormModelState<T>(form, this.factory.build(model), model);
    return modelState;
  }
}

export class NgFormModelState<T> {
  private errors: BehaviorSubject<FieldError[]> = new BehaviorSubject<FieldError[]>([]);
  public errors$ = this.errors.asObservable();

  constructor(private form: NgForm, private modelValidator: ModelValidator<T>, private model: T) {
    this.form.form.valueChanges
      .pipe(
        switchMap(async (x) => {
          return from(this.runValidations());
        })
      )
      .subscribe();

    this.errors$.subscribe((list) => {
      console.log('errored', list);
      Object.keys(this.form.form.controls).forEach((key) => {
        let validationErrors = <ValidationErrors>{ };
        list.filter((e) => e.path == key).forEach((v)=>validationErrors[v.type] = v.message);
        this.form.form.controls[key].setErrors(validationErrors);
        console.log('validation errors: ', validationErrors);
      });
    });
  }

  isValid(): boolean {
    return this.errors.value.length == 0;
  }

  setErrors(errors: FieldError[]) {
    this.errors.next(errors);
  }

  validate(): Promise<boolean> {
    return this.runValidations().then((x) => true);
  }

  private async runValidations(): Promise<void> {
    console.log('validating', this.model);
    const errors = await this.modelValidator.validate(this.model);
    this.errors.next(errors);
  }
}
