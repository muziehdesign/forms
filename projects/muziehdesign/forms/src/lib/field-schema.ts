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
