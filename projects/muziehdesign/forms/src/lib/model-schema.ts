import { AnyObjectSchema, SchemaOf, ValidationError } from 'yup';
import { FieldError } from './field-error';
import { FieldSchema } from './field-schema';
export class ModelSchema<T> {
    // TODO: need to keep track of internal and external
    //private definitions?:  {[K in keyof T]: FieldSchema<any>};
    constructor(private metadata: FieldSchema<any>[], private schema: AnyObjectSchema) {

    }
    
    getMetadata(paths: string[]) {
        //console.log('fetching metadata for path: ', paths);
        //console.log(this.schema.describe());
        for(var i = 0; i < paths.length; i++) {
            const field = this.metadata.find(f=>f.name === paths[i]);
            if(!field?.constraints.required || field.constraints.required.required === false) {
                return { required: false } satisfies FieldMetadata;
            }
        }
        return { required: true } satisfies FieldMetadata;

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

export type SchemaDefinition<T> = {
    //[K in keyof Required<T>]: T[K] extends object ? SchemaDefinition<T[K]>: FieldSchema<any>;
    [K in keyof Required<T>]: FieldSchema<any>
}

export interface FieldMetadata {
    required: boolean;
}