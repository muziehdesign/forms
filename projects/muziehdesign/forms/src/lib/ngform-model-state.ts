import { AbstractControl, FormArray, FormGroup, NgForm, NgModelGroup, ValidationErrors } from '@angular/forms';
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
    const model = this.form.value;
    const state = await this.runValidations(model, this.options?.onValidate);
    this.deleteFormErrors();

    const grouped = state.errors.reduce((grouped, v) => grouped.set(v.path, [...(grouped.get(v.path) || []), v]), new Map<string, FieldError[]>());
    grouped.forEach((value, path) => {
      let validationErrors = <ValidationErrors>{};
      value.forEach((v) => (validationErrors[v.type] = v.message));

      const control = this.form.form.get(path);
      if (!control) {
        // TODO: use actual logging service
      } else {
        control.setErrors(validationErrors);
      }
    });

    this.changesSubject.next(state);
    return state;
  }

  private deleteFormErrors() {
    this.deleteErrors(this.form.form);
  }

  private deleteErrors(rootFormGroup: FormGroup) {
    Object.keys(rootFormGroup.controls).forEach((key) => {
      const control = rootFormGroup.controls[key];

      if (!this.isParentControl(control)) {
        this.deleteErrorsFromControl(key, control);
      } else if (control instanceof FormGroup) {
        this.deleteErrors(control as FormGroup);
      } else if (control instanceof FormArray) {
        this.loopFormArray(control as FormArray);
      }
    });
  }

  private deleteErrorsFromControl(key: string | number, control: AbstractControl) {
    control.setErrors(null);
  }

  private isParentControl(control: AbstractControl) {
    return control instanceof FormGroup || control instanceof FormArray;
  }

  private loopFormArray(formArray: FormArray) {
    formArray.controls.forEach((control, index) => {
      if (!this.isParentControl(control)) {
        this.deleteErrorsFromControl(index, control);
      } else if (control instanceof FormGroup) {
        this.deleteErrors(control as FormGroup);
      } else if (control instanceof FormArray) {
        this.loopFormArray(control as FormArray);
      }
    });
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
