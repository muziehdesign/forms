import 'reflect-metadata';
import { BooleanSchema, SchemaOf, StringSchema } from 'yup';
import { PropertySchemaMetadata } from './property-schema-metadata';
import { PropertyType } from './property-type.enum';

const METADATA_KEY = 'custom:muziehdesign:annotations';

export interface ConstraintAnnotations {
  constraintType: string;
}

/*
export interface OfValuesAnnotations extends ConstraintAnnotations {
  values: [];
  message?: string;
}*/

export interface StringTypeAnnotations extends ConstraintAnnotations {
  required?: RequiredAnnotation;
  length: LengthAnnotation;
}

export interface BooleanTypeAnnotations extends ConstraintAnnotations {
  required?: RequiredAnnotation;
  equals?: EqualsAnnotation<boolean>;
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

export interface OfValuesAnnotation extends ValidationAnnotation {
  values: [];
}

export interface EqualsAnnotation<T> extends ValidationAnnotation {
  equals: T;
}

const registerMetadata = (target: Object, propertyKey: string, constraint: ConstraintAnnotations) => {
  const metadata: Map<string, any> = Reflect.getMetadata(METADATA_KEY, target) || new Map<string, any>();
  metadata.set(propertyKey, constraint);
  Reflect.defineMetadata(METADATA_KEY, metadata, target);
};

/*
export function OfValues<T>(values: T[], message?: string) {
  return function (target: Object, propertyKey: string) {
    const o = { values: values, message: message } as OfValuesAnnotations;
    o.constraintType = OfValues.name;
    registerMetadata(target, propertyKey, o);
  };
}*/

export function StringType(...annotations: { [key: string]: ValidationAnnotation }[]) {
  return function (target: Object, propertyKey: string) {
    const o = Object.assign({}, ...annotations) as StringTypeAnnotations;
    o.constraintType = StringType.name;
    registerMetadata(target, propertyKey, o);
  };
}

export function BooleanType(...annotations: { [key: string]: ValidationAnnotation }[]) {
  return function (target: Object, propertyKey: string) {
    const o = Object.assign({}, ...annotations) as BooleanTypeAnnotations;
    o.constraintType = BooleanType.name;
    registerMetadata(target, propertyKey, o);
  };
}

export function required(message?: string): { [key: string]: RequiredAnnotation } {
  return { required: { required: true, message: message } };
}

export function length(length: number, message?: string): { [key: string]: LengthAnnotation } {
  return { length: { length: length, message: message } };
}

export function ofValues(values: [], message?: string): { [key: string]: OfValuesAnnotation } {
  return { ofValues: { values: values, message: message } };
}

export function equals<T>(value: T, message?: string) : { [key: string]: EqualsAnnotation<T> } {
  return { equals: { equals: value, message: message } };
}
