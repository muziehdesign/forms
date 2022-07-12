import { SchemaOf, ValidationError } from 'yup';
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
      .catch((e: ValidationError) => {
        return e.inner.map((error) => <FieldError>{ path: error.path, type: error.type, message: error.message });
      });
  }
}
