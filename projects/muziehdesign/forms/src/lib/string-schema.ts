import 'reflect-metadata';
import { BooleanSchema, SchemaOf, StringSchema } from 'yup';
import { PropertySchemaMetadata } from './property-schema-metadata';
import { PropertyType } from './property-type.enum';

const METADATA_KEY = 'custom:muziehdesign:annotations';

export interface ConstraintAnnotations {
  constraintType: string;
}

export interface OneOfAnnotations extends ConstraintAnnotations {
  values: [];
  message?: string;
}

export interface StringTypeAnnotations extends ConstraintAnnotations {
  required?: RequiredAnnotation;
  length: LengthAnnotation;
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

export function OneOf<T>(values: T[]) {
  return function (target: Object, propertyKey: string) {
    const metadata: Map<string, any> = Reflect.getMetadata(METADATA_KEY, target) || new Map<string, any>();
    /*const o = Object.assign({}, ...annotations) as StringTypeAnnotations;
    o.constraintType = StringType.name;
    metadata.set(propertyKey, o);*/
    Reflect.defineMetadata(METADATA_KEY, metadata, target);
  };
}

export function StringType(...annotations: { [key:string]: ValidationAnnotation}[]) {
  return function (target: Object, propertyKey: string) {
    const metadata: Map<string, any> = Reflect.getMetadata(METADATA_KEY, target) || new Map<string, any>();
    const o = Object.assign({}, ...annotations) as StringTypeAnnotations;
    o.constraintType = StringType.name;
    metadata.set(propertyKey, o);
    Reflect.defineMetadata(METADATA_KEY, metadata, target);
  };
}

export function required(message?: string): { [key: string]: RequiredAnnotation } {
  return { required: { required: true, message: message } };
}

export function length(length: number, message?: string): { [key: string]: LengthAnnotation } {
  return { length: { length: length, message: message } };
}
