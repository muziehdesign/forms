import { AnyObjectSchema, SchemaOf, ValidationError } from 'yup';
import { FieldError } from './field-error';
import { ConstraintAnnotations } from './type-annotations';

export class ModelValidator<T> {
    constructor(private schema: AnyObjectSchema) {}

    get paths() {
        //return Array.from(this.metadata, ([key, value]) => ({ key, value }));
        return [];
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

    cast(value: any) {
        return this.schema.cast(value);
    }
}
