import { Injectable } from '@angular/core';
import { mixed, object, SchemaOf, string, StringSchema } from 'yup';
import { ModelValidator } from './model-validator';
import { SCHEMA_METADATA_NAMESPACE } from './constants';
import { ObjectShape } from 'yup/lib/object';
import { ConstraintAnnotations, StringType, StringTypeAnnotations } from './string-schema';

@Injectable({
  providedIn: 'root',
})
export class ModelSchemaFactory {
  constructor() {}

  build<T>(model: T): ModelValidator<T> {
    const metadata: Map<string, ConstraintAnnotations> = Reflect.getMetadata(SCHEMA_METADATA_NAMESPACE, model);
    let shape: ObjectShape = {};
    metadata.forEach((value, key) => {
      if (value.constraintType == StringType.name) {
        shape[key] = this.buildStringSchema(value as StringTypeAnnotations);
      }
    });
    const schema = object(shape) as SchemaOf<T>;
    return new ModelValidator(schema);
  }

  private buildStringSchema(options: StringTypeAnnotations) {
    let stringSchema = string();
    if (options.required) {
      stringSchema = stringSchema.required(options.required.message);
    }
    if (options.length) {
      stringSchema = stringSchema.length(options.length.length, options.length.message);
    }

    return stringSchema;
  }
}
