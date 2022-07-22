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

  create<T>(form: NgForm, model: T, options?: ModelStateOptions) {
    const modelState = new NgFormModelState<T>(form, this.factory.build(model), model, options);
    return modelState;
  }
}

export interface ModelStateOptions {
  validateCallback: () => FieldError[]
}

export class NgFormModelState<T> {
  private errors: BehaviorSubject<FieldError[]> = new BehaviorSubject<FieldError[]>([]);
  public errors$ = this.errors.asObservable();

  constructor(private form: NgForm, private modelValidator: ModelValidator<T>, private model: T, options?: ModelStateOptions) {
    this.form.form.valueChanges
      .pipe(
        switchMap(async (x) => {
          this.model = x;
          return from(this.runValidations(options?.validateCallback))
        })
      )
      .subscribe();

    this.errors$.subscribe((list) => {
      const grouped = list.reduce((grouped, v) => grouped.set(v.path, [...(grouped.get(v.path) || []), v]), new Map<string, FieldError[]>());

      grouped.forEach((value, key) => {
        let validationErrors = <ValidationErrors>{};
        value.forEach((v) => (validationErrors[v.type] = v.message));
        try {
          this.form.controls[key].setErrors(validationErrors);
        } catch (e) {
          console.log('error setting form control', key);
          throw e;
        }
      });
    });
  }

  isValid(): boolean {
    return this.errors.value.length == 0;
  }

  setErrors(errors: FieldError[]) {
    this.errors.next(errors);
  }

  async validate(): Promise<void> {
    return await this.runValidations();
  }

  private async runValidations(callback?: ()=>FieldError[]): Promise<void> {
    const errors = await this.modelValidator.validate(this.model);
    const additional = callback?.() || [];
    this.errors.next(errors.concat(additional));
  }
}
