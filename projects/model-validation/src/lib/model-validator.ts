import { object, ObjectSchema, SchemaOf } from 'yup';
import { AssertsShape } from 'yup/lib/object';
import { FieldError } from './field-error';

export class ModelValidator<T> {
  private schema: SchemaOf<T>;
  constructor(modelSchema: SchemaOf<T>) {
    this.schema = modelSchema;
  }

  validate<T>(model: T): Promise<FieldError[]> {
    return this.schema
      .validate(model, { abortEarly: false })
      .then(() => {
        return [];
      })
      .catch((e: any) => {
        console.log('error: ', e);
        return [];
      });
  }
}
