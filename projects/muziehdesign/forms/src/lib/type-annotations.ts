import 'reflect-metadata';
import { ArraySchema, BooleanSchema, DateSchema, FieldSchema, FieldSchemaType, FileSchema, NumberSchema, ObjectSchema, StringSchema } from './field-schema';

const METADATA_KEY = 'custom:muziehdesign:annotations';

export interface ConstraintAnnotations {}

export interface StringTypeConstraints {
    required?: true;
    requiredMessage?: string;

    pattern?: RegExp;
    patternMessage?: string;

    length?: number;
    lengthMessage?: string;
}

export interface StringTypeAnnotations extends ConstraintAnnotations {
    required?: RequiredAnnotation;
    length?: LengthAnnotation;
    pattern?: PatternAnnotation;
    maxLength?: MaxLengthAnnotation;
    minLength?: MinLengthAnnotation;
}

export interface BooleanTypeAnnotations extends ConstraintAnnotations {
    required?: RequiredAnnotation;
    equals?: EqualsAnnotation<boolean>;
}

export interface DateTypeAnnotations extends ConstraintAnnotations {
    required?: RequiredAnnotation;
    min?: MinimumAnnotation<Date>;
    max?: MaximumAnnotation<Date>;
    test?: TestAnnotation<Date>;
}

export interface ObjectTypeAnnotations extends ConstraintAnnotations {
    required?: RequiredAnnotation;
    getInstance: () => any;
}

export interface NumberTypeAnnotations extends ConstraintAnnotations {
    required?: RequiredAnnotation;
    min?: MinimumAnnotation<number>;
    max?: MaximumAnnotation<number>;
}

export interface ArrayTypeAnnotations extends ConstraintAnnotations {
    min?: MinimumAnnotation<number>;
    max?: MaximumAnnotation<number>;
}

export interface FileTypeAnnotations extends ConstraintAnnotations {
    required?: RequiredAnnotation;
}

export interface ValidationAnnotation {
    message?: string;
}

export interface RequiredAnnotation extends ValidationAnnotation {
    required: boolean;
}

export interface LengthAnnotation extends ValidationAnnotation {
    length: number;
}

export interface PatternAnnotation extends ValidationAnnotation {
    pattern: RegExp;
}

export interface OfValuesAnnotation extends ValidationAnnotation {
    values: [];
}

export interface EqualsAnnotation<T> extends ValidationAnnotation {
    equals: T;
}

export interface MinimumAnnotation<T> extends ValidationAnnotation {
    min: T;
}

export interface MaximumAnnotation<T> extends ValidationAnnotation {
    max: T;
}

export interface TestAnnotation<T> extends ValidationAnnotation {
    test: (d: T) => boolean;
    name: string;
}

export interface MaxLengthAnnotation extends ValidationAnnotation {
    maxLength: number;
}

export interface MinLengthAnnotation extends ValidationAnnotation {
    minLength: number;
}

export interface ModelMetadata {
    name?: string;
    schemas: Map<string, FieldSchema<any>>;
}

const registerPropertyMetadata = (target: Object, propertyKey: string, schema: FieldSchema<any>) => {
    const metadata: ModelMetadata = Reflect.getMetadata(METADATA_KEY, target) || ({ schemas: new Map<string, FieldSchema<any>>() } satisfies ModelMetadata);
    metadata.schemas.set(propertyKey, schema);
    Reflect.defineMetadata(METADATA_KEY, metadata, target);
};

const registerMetadata = (target: Object, name: string) => {
    const metadata: ModelMetadata = Reflect.getMetadata(METADATA_KEY, target) || ({ schemas: new Map<string, FieldSchema<any>>() } satisfies ModelMetadata);
    metadata.name = name;
    Reflect.defineMetadata(METADATA_KEY, metadata, target);
};

export function StringType(...annotations: { [key: string]: ValidationAnnotation }[]) {
    return function (target: Object, propertyKey: string) {
        const schema = {
            name: propertyKey,
            type: FieldSchemaType.string,
            constraints: Object.assign({}, ...annotations) as StringTypeAnnotations,
        } satisfies StringSchema;

        registerPropertyMetadata(target, propertyKey, schema);
    };
}

export function BooleanType(...annotations: { [key: string]: ValidationAnnotation }[]) {
    return function (target: Object, propertyKey: string) {
        const schema = {
            name: propertyKey,
            type: FieldSchemaType.boolean,
            constraints: Object.assign({}, ...annotations) as BooleanTypeAnnotations,
        } satisfies BooleanSchema;

        registerPropertyMetadata(target, propertyKey, schema);
    };
}

export function DateType(...annotations: { [key: string]: ValidationAnnotation }[]) {
    return function (target: Object, propertyKey: string) {
        const schema = {
            name: propertyKey,
            type: FieldSchemaType.date,
            constraints: Object.assign({}, ...annotations) as DateTypeAnnotations,
        } satisfies DateSchema;

        registerPropertyMetadata(target, propertyKey, schema);
    };
}

export function NumberType(...annotations: { [key: string]: ValidationAnnotation }[]) {
    return function (target: Object, propertyKey: string) {
        const schema = {
            name: propertyKey,
            type: FieldSchemaType.number,
            constraints: Object.assign({}, ...annotations) as NumberTypeAnnotations,
        } satisfies NumberSchema;

        registerPropertyMetadata(target, propertyKey, schema);
    };
}

export function ObjectType<T>(type: { new (): T }, ...annotations: { [key: string]: ValidationAnnotation }[]) {
    return function (target: Object, propertyKey: string) {
        const schema = {
            name: propertyKey,
            type: FieldSchemaType.object,
            constraints: Object.assign({}, ...annotations, { getInstance: () => new type() } as Partial<ObjectTypeAnnotations>) as ObjectTypeAnnotations,
        } satisfies ObjectSchema;

        registerPropertyMetadata(target, propertyKey, schema);
    };
}

export function ArrayType(...annotations: { [key: string]: ValidationAnnotation }[]) {
    return function (target: Object, propertyKey: string) {
        const schema = {
            name: propertyKey,
            type: FieldSchemaType.array,
            constraints: Object.assign({}, ...annotations) as ArrayTypeAnnotations,
        } satisfies ArraySchema;

        registerPropertyMetadata(target, propertyKey, schema);
    };
}

export function FileType<T>(...annotations: { [key: string]: ValidationAnnotation }[]) {
    return function (target: Object, propertyKey: string) {
        const schema = {
            name: propertyKey,
            type: FieldSchemaType.file,
            constraints: Object.assign({}, ...annotations) as FileTypeAnnotations,
        } satisfies FileSchema;

        registerPropertyMetadata(target, propertyKey, schema);
    };
}

export function Model(name: string) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        // Class decorators receive the constructor, but property decorators write to constructor.prototype
        // So we need to write to constructor.prototype to share the same metadata object
        registerMetadata(constructor.prototype, name);
        return constructor;
    }
}

export function required(message?: string): { [key: string]: RequiredAnnotation } {
    return { required: { required: true, message: message } };
}

export function pattern(regex: RegExp, message?: string): { [key: string]: PatternAnnotation } {
    return { pattern: { pattern: regex, message: message } };
}

export function length(length: number, message?: string): { [key: string]: LengthAnnotation } {
    return { length: { length: length, message: message } };
}

export function maxLength(maxLength: number, message?: string): { [key: string]: MaxLengthAnnotation } {
    return { maxLength: { maxLength: maxLength, message: message } };
}

export function minLength(minLength: number, message?: string): { [key: string]: MinLengthAnnotation } {
    return { minLength: { minLength: minLength, message: message } };
}

export function ofValues(values: [], message?: string): { [key: string]: OfValuesAnnotation } {
    return { ofValues: { values: values, message: message } };
}

export function equals<T>(value: T, message?: string): { [key: string]: EqualsAnnotation<T> } {
    return { equals: { equals: value, message: message } };
}

export function min<T>(value: T, message?: string): { [key: string]: MinimumAnnotation<T> } {
    return { min: { min: value, message: message } };
}

export function max<T>(value: T, message?: string): { [key: string]: MaximumAnnotation<T> } {
    return { max: { max: value, message: message } };
}

export function test<T>(name: string, test: (d: T) => boolean, message?: string): { [key: string]: TestAnnotation<T> } {
    return { test: { name: name, test: test, message: message } };
}
