import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgForm, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, filter, from, switchMap } from 'rxjs';
import { FieldError } from './field-error';
import { ModelSchemaFactory } from './model-schema.factory';
import { ModelStateOptions } from './model-state-options';
import { ModelValidator } from './model-validator';
import { NgFormModelState } from './ngform-model-state';

@Injectable({
  providedIn: 'root',
})
export class NgFormModelStateFactory {
  constructor(private factory: ModelSchemaFactory) {}

  create<T>(form: NgForm, model: T, options?: ModelStateOptions) {
    const modelState = new NgFormModelState<T>(form, this.factory.build(model), options);
    return modelState;
  }
}
