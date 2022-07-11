import { Injectable } from '@angular/core';
import { string } from 'yup';
import { ModelValidator } from './model-validator';
import { StringSchemaOptions } from './string-schema';
import { SCHEMA_METADATA_NAMESPACE } from './constants';

@Injectable({
  providedIn: 'root',
})
export class ModelSchemaFactory {
  constructor() {}

  build<T>(model: T): ModelValidator<T> | null {
    const metadata = Reflect.getMetadata(SCHEMA_METADATA_NAMESPACE, model);

    //const validator = new ModelValidator(metadata);
    return null;
  }

  private buildStringSchema(options: StringSchemaOptions) {
    let stringSchema = string();
    if (options.required) {
      stringSchema = stringSchema.required();
    }
    if (options.length) {
      stringSchema = stringSchema.length(options.length);
    }
    if (options.minimum) {
      stringSchema = stringSchema.min(options.minimum);
    }
    if (options.maximum) {
      stringSchema = stringSchema.max(options.maximum);
    }

    return stringSchema;
  }
}
