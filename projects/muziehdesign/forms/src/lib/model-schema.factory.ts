import { Injectable } from '@angular/core';
import { object, SchemaOf } from 'yup';
import { ModelSchema } from './model-schema';
import { SCHEMA_METADATA_NAMESPACE } from './constants';
import { ObjectShape } from 'yup/lib/object';
import * as Yup from 'yup';
import { ArraySchema, BooleanSchema, DateSchema, FieldSchema, FieldSchemaType, FileSchema, NumberSchema, ObjectSchema, StringSchema } from './field-schema';

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

  /**
   * @deprecated Use buildSchema() instead
   */
  build<T extends object>(model: T): ModelSchema<T> {
    const metadata: Map<string, FieldSchema<any>> = Reflect.getMetadata(SCHEMA_METADATA_NAMESPACE, model);
    const schema = this.buildYupSchema([...metadata.values()]);
    return new ModelSchema(schema);
  }

  buildUntyped(raw: FieldSchema<any>[]) : ModelSchema<{[key: string]: string}> {
    const schema = this.buildYupSchema(raw);
    return new ModelSchema(schema);
  }

  private buildYupSchema(fields: FieldSchema<any>[]) : Yup.AnyObjectSchema {
    let shape: ObjectShape = {};
    fields.forEach((value) => {
      if (value.type == FieldSchemaType.string) {
        shape[value.name] = this.buildStringSchema(value as StringSchema);
      } else if (value.type == FieldSchemaType.boolean) {
        shape[value.name] = this.buildBooleanSchema(value as BooleanSchema);
      } else if (value.type == FieldSchemaType.date) {
        shape[value.name] = this.buildDateSchema(value as DateSchema);
      } else if (value.type == FieldSchemaType.object) {
        shape[value.name] = this.buildNestedObjectSchema(value as ObjectSchema);
      } else if (value.type == FieldSchemaType.number) {
        shape[value.name] = this.buildNumberSchema(value as NumberSchema);
      } else if (value.type == FieldSchemaType.array) {
        shape[value.name] = this.buildArraySchema(value as ArraySchema);
      } else if (value.type == FieldSchemaType.file) {
        shape[value.name] = this.buildFileSchema(value as FileSchema);
      } else {
        throw new Error('Unrecognized field schema');
      }
    });

    return object(shape);
  }

  private buildStringSchema(original: StringSchema) {
    let schema = Yup.string();
    if(original.label) {
      schema.label(original.label);
    }

    const options = original.constraints;    

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
      schema = schema.matches(options.pattern.pattern, { message: options.pattern.message, excludeEmptyString: true });
    }

    return schema;
  }

  private buildBooleanSchema(original: BooleanSchema) {
    let schema = Yup.boolean();
    if(original.label) {
      schema.label(original.label);
    }

    const options = original.constraints;  
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

  private buildDateSchema(original: DateSchema) {
    let schema = Yup.date();
    if(original.label) {
      schema.label(original.label);
    }

    const options = original.constraints;  
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
        },
      });
    }

    return schema;
  }

  private buildNumberSchema(original: NumberSchema) {
    let schema = Yup.number();
    if(original.label) {
      schema.label(original.label);
    }

    const options = original.constraints;  
    if (options.required) {
      schema = schema.required(options.required.message);
    }
    if (options.min) {
      schema = schema.min(options.min.min, options.min.message);
    }
    if (options.max) {
      schema = schema.max(options.max.max, options.max.message);
    }

    return schema;
  }

  private buildArraySchema(original: ArraySchema) {
    let schema = Yup.array();
    if(original.label) {
      schema.label(original.label);
    }

    const options = original.constraints;  

    if (options.min) {
      schema = schema.min(options.min.min, options.min.message);
    }
    if (options.max) {
      schema = schema.max(options.max.max, options.max.message);
    }

    return schema;
  }

  private buildNestedObjectSchema(original: ObjectSchema) {
    const metadata: Map<string, FieldSchema<any>> = Reflect.getMetadata(SCHEMA_METADATA_NAMESPACE, original.constraints.getInstance());

    let nestedSchema = this.buildYupSchema([...metadata.values()]);
    if(original.label) {
      nestedSchema.label(original.label);
    }

    const options = original.constraints;  
    if (options.required) {
      nestedSchema = nestedSchema.required();
    } else {
      nestedSchema = nestedSchema.notRequired().default(undefined);
    }

    return nestedSchema;
  }

  private buildFileSchema(original: FileSchema) {
    let schema = Yup.mixed().nullable().optional();
    if(original.label) {
      schema.label(original.label);
    }

    const options = original.constraints;  
    if (options.required) {
      schema = schema.required(options.required.message);
    }

    return schema;
  }
}
