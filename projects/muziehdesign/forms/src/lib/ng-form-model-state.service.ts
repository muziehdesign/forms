import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModelSchemaFactory } from './model-schema.factory';
import { ModelStateOptions } from './model-state-options';
import { NgFormModelState } from './ngform-model-state';

@Injectable({
  providedIn: 'root',
})
export class NgFormModelStateFactory {
  constructor(private factory: ModelSchemaFactory) {}

  create<T extends object>(form: NgForm, model: T, options?: ModelStateOptions) {
    const modelState = new NgFormModelState<T>(form, this.factory.build(model), options);
    return modelState;
  }
}
