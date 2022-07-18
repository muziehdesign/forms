import { Injectable } from '@angular/core';
import { object, SchemaOf } from 'yup';
import { ModelValidator } from './model-validator';
import { SCHEMA_METADATA_NAMESPACE } from './constants';
import { ObjectShape } from 'yup/lib/object';
import { BooleanType, BooleanTypeAnnotations, ConstraintAnnotations, ConstraintType, StringType2, StringTypeAnnotations } from './type-annotations';
import * as Yup from 'yup';

@Injectable({
  providedIn: 'root',
})
export class ModelSchemaFactory {
  constructor() {}

  build<T>(model: T): ModelValidator<T> {
    const metadata: Map<string, ConstraintAnnotations> = Reflect.getMetadata(SCHEMA_METADATA_NAMESPACE, model);
    let shape: ObjectShape = {};
    metadata.forEach((value, key) => {
      if (value.constraintType == ConstraintType.string) {
        shape[key] = this.buildStringSchema(value as StringTypeAnnotations);
      } else if (value.constraintType == ConstraintType.boolean) {
        shape[key] = this.buildBooleanSchema(value as BooleanTypeAnnotations);
      }
    });
    const schema = object(shape) as SchemaOf<T>;
    console.log(schema);
    console.log(schema.isValidSync({instructions: null}));
    return new ModelValidator(schema);
  }

  private buildStringSchema(options: StringTypeAnnotations) {
    let schema = Yup.string();
    if (options.required) {
      schema = schema.required(options.required.message);
    }
    if (options.length) {
      schema = schema.length(options.length.length, options.length.message);
    }

    return schema;
  }

  private buildBooleanSchema(options: BooleanTypeAnnotations) {
    let schema = Yup.boolean();
    if (options.required) {
      schema = schema.required(options.required.message);
    }
    if (options.equals) {
      if (options.equals.equals) {
        schema = schema.isTrue(options.equals.message);
      } else {
        schema = schema.isFalse(options.equals.message);
      }
    }

    return schema;
  }
}
