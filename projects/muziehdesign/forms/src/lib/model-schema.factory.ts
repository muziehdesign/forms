import { Injectable } from '@angular/core';
import { object, SchemaOf } from 'yup';
import { ModelValidator } from './model-validator';
import { SCHEMA_METADATA_NAMESPACE } from './constants';
import { ObjectShape } from 'yup/lib/object';
import { BooleanTypeAnnotations, ConstraintAnnotations, ConstraintType, DateTypeAnnotations, StringTypeAnnotations } from './type-annotations';
import * as Yup from 'yup';

/*
Schema rules need to be built in the order they need to be evaluated in.
For example,
  ```
    schema.required().max(...).matches(...);
  ```
evaluates the 3 rules in this order
  - required
  - max
  - matches
*/

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
      } else if (value.constraintType == ConstraintType.date) {
        shape[key] = this.buildDateSchema(value as DateTypeAnnotations);
      }
    });
    const schema = object(shape) as SchemaOf<T>;
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

    if (options.maxLength) {
      schema = schema.max(options.maxLength.maxLength, options.maxLength.message);
    }

    if (options.minLength) {
      schema = schema.min(options.minLength.minLength, options.minLength.message);
    }

    if (options.pattern) {
      schema = schema.matches(options.pattern.pattern, options.pattern.message);
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

  private buildDateSchema(options: DateTypeAnnotations) {
    let schema = Yup.date().typeError('Please enter a valid date');
    if (options.required) {
      schema = schema.required(options.required.message);
    }
    if (options.min) {
      schema = schema.min(options.min.min, options.min.message);
    }
    if (options.max) {
      schema = schema.max(options.max.max, options.max.message);
    }
    if (options.test) {
      schema = schema.test({
        name: options.test.name,
        message: options.test.message,
        test: (d?: Date, context?: any) => {
        return options.test!.test(d!);
      }});
    }

    return schema;
  }
}
