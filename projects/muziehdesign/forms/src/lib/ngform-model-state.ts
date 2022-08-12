import { NgForm, ValidationErrors } from "@angular/forms";
import { BehaviorSubject, from, switchMap } from "rxjs";
import { FieldError } from "./field-error";
import { ModelStateOptions } from "./model-state-options";
import { ModelStateResult } from "./model-state-result";
import { ModelValidator } from "./model-validator";

export class NgFormModelState<T> {
  private changesSubject = new BehaviorSubject<ModelStateResult<T> | undefined>(undefined);
  public readonly changes = this.changesSubject.asObservable();
  private errors: BehaviorSubject<FieldError[]> = new BehaviorSubject<FieldError[]>([]);
  private errors$ = this.errors.asObservable();
  private options?: ModelStateOptions;

  constructor(private form: NgForm, private modelValidator: ModelValidator<T>, options?: ModelStateOptions) {
    this.options = options;

    this.form.form.valueChanges
      .pipe(
        switchMap(async (x) => {
          return from(this.validate())
        })
      )
      .subscribe();

    /*this.errors$.subscribe((list) => {
      const grouped = list.reduce((grouped, v) => grouped.set(v.path, [...(grouped.get(v.path) || []), v]), new Map<string, FieldError[]>());

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

      this.changesSubject.next({valid: this.errors.value.length == 0, errors: list, model: this.model });
    });*/
  }

  // TODO: rename
  isValid(): boolean {
    return this.errors.value.length == 0;
  }

  setErrors(errors: FieldError[]) {
    //this.errors.next(errors);
    throw new Error("needs implementation");
  }

  async validate(): Promise<ModelStateResult<T>> {
    const model = this.form.value;
    const state = await this.runValidations(model, this.options?.onValidate);
    this.form.resetForm(model);

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

  private async runValidations<T>(model:T, callback?: (list: FieldError[]) => FieldError[]): Promise<ModelStateResult<T>> {
    //this.removeCurrentErrors();
    const list = await this.modelValidator.validate(model);
    const final = callback?.(list) || list;
    return {
      valid: this.errors.value.length == 0,
      errors: final, 
      model: model
    };
    // this.errors.next(final);
  }

  private removeCurrentErrors() {
    //Object.keys(this.form.controls).forEach((key) => this.form.controls[key].setErrors(null));
  }

}
