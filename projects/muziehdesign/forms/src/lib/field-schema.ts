import { ArrayTypeAnnotations, BooleanTypeAnnotations, ConstraintAnnotations, DateTypeAnnotations, FileTypeAnnotations, NumberTypeAnnotations, ObjectTypeAnnotations, StringTypeAnnotations } from './type-annotations';

export enum FieldSchemaType {
    string = 'string',
    boolean = 'boolean',
    date = 'date',
    object = 'object',
    number = 'number',
    array = 'array',
    file = 'file',
}

export interface FieldSchema<T extends ConstraintAnnotations> {
    name: string;
    type: FieldSchemaType;
    label?: string;
    constraints: T;
}

export interface StringSchema extends FieldSchema<StringTypeAnnotations> {
    type: FieldSchemaType.string;
}

export interface NumberSchema extends FieldSchema<NumberTypeAnnotations> {
    type: FieldSchemaType.number;
}

export interface BooleanSchema extends FieldSchema<BooleanTypeAnnotations> {
    type: FieldSchemaType.boolean;
}

export interface DateSchema extends FieldSchema<DateTypeAnnotations> {
    type: FieldSchemaType.date;
}

export interface ArraySchema extends FieldSchema<ArrayTypeAnnotations> {
    type: FieldSchemaType.array;
}

export interface FileSchema extends FieldSchema<FileTypeAnnotations> {
    type: FieldSchemaType.file;
}

export interface ObjectSchema extends FieldSchema<ObjectTypeAnnotations> {
    type: FieldSchemaType.object;
}

export const buildStringSchema = (path: string, constraints: StringTypeAnnotations, label?: string) => {
    return {
        name: path,
        label: label,
        type: FieldSchemaType.string,
        constraints: { ...constraints },
    } satisfies StringSchema;
};

export const buildBooleanSchema = (path: string, constraints: BooleanTypeAnnotations, label?: string) => {
    return {
        name: path,
        label: label,
        type: FieldSchemaType.boolean,
        constraints: { ...constraints },
    } satisfies BooleanSchema;
};

export const buildNumberSchema = (path: string, constraints: NumberTypeAnnotations, label?: string) => {
    return {
        name: path,
        label: label,
        type: FieldSchemaType.number,
        constraints: { ...constraints },
    } satisfies NumberSchema;
};

export const buildDateSchema = (path: string, constraints: DateTypeAnnotations, label?: string) => {
    return {
        name: path,
        label: label,
        type: FieldSchemaType.date,
        constraints: { ...constraints },
    } satisfies DateSchema;
};

export const buildArraySchema = (path: string, constraints: ArrayTypeAnnotations, label?: string) => {
    return {
        name: path,
        label: label,
        type: FieldSchemaType.array,
        constraints: { ...constraints },
    } satisfies ArraySchema;
};
