import { FormArray, FormGroup, NgForm, NgModelGroup, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, distinctUntilChanged, from, switchMap } from 'rxjs';
import { FieldError } from './field-error';
import { ModelStateOptions } from './model-state-options';
import { ModelStateResult } from './model-state-result';
import { ModelValidator } from './model-validator';

export class NgFormModelState<T> {
  private changesSubject = new BehaviorSubject<ModelStateResult<T> | undefined>(undefined);
  public readonly changes = this.changesSubject.asObservable();

  constructor(private form: NgForm, private modelValidator: ModelValidator<T>, private options?: ModelStateOptions) {
    this.form.form.valueChanges
      .pipe(
        switchMap(async (x) => {
          return from(this.validate());
        })
      )
      .subscribe();
  }

  getCurrent(): ModelStateResult<T> | undefined {
    return this.changesSubject.value;
  }

  setErrors(errors: FieldError[]) {
    //this.errors.next(errors);
    throw new Error('needs implementation');
  }

  async validate(): Promise<ModelStateResult<T>> {
    console.log('validating');
    const model = this.form.value;
    const state = await this.runValidations(model, this.options?.onValidate);
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.controls[key];
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((key) => {
          console.log('clearing errors for ' + key, control instanceof FormGroup, control instanceof FormArray);
          control.controls[key].setErrors(null);
        })
      }
      console.log('clearing errors for ' + key, control instanceof FormGroup, control instanceof FormArray);
      this.form.controls[key].setErrors(null);
    });

    const grouped = state.errors.reduce((grouped, v) => grouped.set(v.path, [...(grouped.get(v.path) || []), v]), new Map<string, FieldError[]>());
    grouped.forEach((value, path) => {
      let validationErrors = <ValidationErrors>{};
      value.forEach((v) => (validationErrors[v.type] = v.message));

      const control = this.form.form.get(path);
      if (!control) {
        // TODO: use actual logging service
        console.log(`cannot find path ${path}, which has errors`, validationErrors);
      } else {
        control.setErrors(validationErrors);
      }
    });

    this.changesSubject.next(state);
    return state;
  }

  private async runValidations<T>(model: T, callback?: (list: FieldError[]) => FieldError[]): Promise<ModelStateResult<T>> {
    const list = await this.modelValidator.validate(model);
    const final = callback?.(list) || list;
    return {
      valid: final.length === 0,
      errors: final,
      model: model,
    };
  }
}
