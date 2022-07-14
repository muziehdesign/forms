import { Injectable } from '@angular/core';
import { boolean, mixed, object, SchemaOf, string } from 'yup';
import { ModelValidator } from './model-validator';
import { BooleanSchemaOptions, Equals, EqualsValueAnnotation, PropertyAnnotation, PropertyAnnotations, Required, SchemaOptions, StringSchemaOptions } from './string-schema';
import { SCHEMA_METADATA_NAMESPACE } from './constants';
import { ObjectShape } from 'yup/lib/object';
import { PropertySchemaMetadata } from './property-schema-metadata';
import { PropertyType } from './property-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ModelSchemaFactory {
  constructor() {}

  build<T>(model: T): ModelValidator<T> {
    const metadata: Map<string, PropertyAnnotation<any>[]> = Reflect.getMetadata(SCHEMA_METADATA_NAMESPACE, model);
    let shape: ObjectShape = {};
    metadata.forEach((v, k, map) => {
      v.forEach((annotation) => {
        if (annotation.type == Required.name) {
          shape[k] = mixed().test('required', annotation.errorMessage || 'invalid default message', (v) => v && v != '');
        } else if (annotation.type == Equals.name) {
          const a = annotation as PropertyAnnotation<EqualsValueAnnotation>;
          shape[k] = mixed().test('equals', annotation.errorMessage || 'invalid must be equal', (v) => v === a.specification.value);
        }
      });
    });
    /*metadata.forEach((element) => {
      if (element.type == PropertyType.string) {
        shape[element.name] = this.buildStringSchema(element.options || {});
      } else if (element.type == PropertyType.boolean) {
        shape[element.name] = this.buildBooleanSchema(element.options || {});
      }
    });*/
    const schema = object(shape) as SchemaOf<T>;
    return new ModelValidator(schema);
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

  private buildBooleanSchema(options: BooleanSchemaOptions) {
    let booleanSchema = boolean().required();
    if (options.equals) {
      return booleanSchema.test({
        name: 'mustBe',
        test: (value) => value == options.equals,
      });
    }

    return booleanSchema;
  }
}
