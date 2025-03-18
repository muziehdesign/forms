import { AnyObjectSchema, SchemaOf, ValidationError } from 'yup';
import { FieldError } from './field-error';


export class ModelSchema<T> {
    // TODO: need to keep track of internal and external
    private definitions:  {[K in keyof T]: string};
    constructor(private schema: AnyObjectSchema) {
        this.definitions = schema.fields;
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