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
  onValidate: (errors: FieldError[]) => FieldError[]
}

export class NgFormModelState<T> {
  private errors: BehaviorSubject<FieldError[]> = new BehaviorSubject<FieldError[]>([]);
  public errors$ = this.errors.asObservable();
  private options?: ModelStateOptions;

  constructor(private form: NgForm, private modelValidator: ModelValidator<T>, private model: T, options?: ModelStateOptions) {
    this.options = options;
    
    this.form.form.valueChanges
      .pipe(
        switchMap(async (x) => {
          this.model = x;
          return from(this.runValidations(this.options?.onValidate))
        })
      )
      .subscribe();

    this.errors$.subscribe((list) => {
      const grouped = list.reduce((grouped, v) => grouped.set(v.path, [...(grouped.get(v.path) || []), v]), new Map<string, FieldError[]>());

      grouped.forEach((value, key) => {
        let validationErrors = <ValidationErrors>{};
        value.forEach((v) => (validationErrors[v.type] = v.message));
        this.form.controls[key]?.setErrors(validationErrors);
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
    return await this.runValidations(this.options?.onValidate);
  }

  private async runValidations(callback?: (list:FieldError[])=>FieldError[]): Promise<void> {
    this.removeCurrentErrors();
    const list = await this.modelValidator.validate(this.model);
    const final = callback?.(list) || list;
    this.errors.next(final);
  }

  private removeCurrentErrors() {
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].setErrors(null));
  }
}
