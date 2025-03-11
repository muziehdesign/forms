import { AnyObjectSchema, SchemaOf, ValidationError } from 'yup';
import { FieldError } from './field-error';
import { ConstraintAnnotations } from './type-annotations';

export class ModelValidator<T> {
    constructor(private schema: AnyObjectSchema, private metadata: Map<string, ConstraintAnnotations>) {}

    get paths() {
        return Array.from(this.metadata, ([key, value]) => ({ key, value }));
    }

    keyValue(key: string) {
        return this.schema.fields[key];
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

    instantiate(): any {
        console.log(this.schema.fields);
      return this.schema.getDefault();
    }
}
