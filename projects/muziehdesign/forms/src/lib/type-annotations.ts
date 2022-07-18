import 'reflect-metadata';
import { BooleanSchema, SchemaOf, StringSchema } from 'yup';
import { PropertySchemaMetadata } from './property-schema-metadata';
import { PropertyType } from './property-type.enum';

const METADATA_KEY = 'custom:muziehdesign:annotations';

export enum ConstraintType {
  string,
  boolean
}

export interface ConstraintAnnotations {
  constraintType: ConstraintType;
}

/*
export interface OfValuesAnnotations extends ConstraintAnnotations {
  values: [];
  message?: string;
}*/

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

export interface MaxLengthAnnotation extends ValidationAnnotation {
  maxLength: number;
}

export interface MinLengthAnnotation extends ValidationAnnotation {
  minLength: number;
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

export function Annotate<T extends ConstraintAnnotations>(a: AnnotationType<T>) {
  return function (target: Object, propertyKey: string) {
    console.log('annotations', a.annotations);
    registerMetadata(target, propertyKey, a.annotations as ConstraintAnnotations);
  };
}

export function StringType(...annotations: { [key: string]: ValidationAnnotation }[]) {
  return function (target: Object, propertyKey: string) {
    const o = Object.assign({}, ...annotations) as StringTypeAnnotations;
    o.constraintType = ConstraintType.string;
    registerMetadata(target, propertyKey, o);
  };
}

export function BooleanType(...annotations: { [key: string]: ValidationAnnotation }[]) {
  return function (target: Object, propertyKey: string) {
    const o = Object.assign({}, ...annotations) as BooleanTypeAnnotations;
    o.constraintType = ConstraintType.boolean;
    registerMetadata(target, propertyKey, o);
  };
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

export abstract class AnnotationType<T> {
  public abstract readonly name: string;
  public abstract annotations?: T;
}

export class StringType2 extends AnnotationType<StringTypeAnnotations> {
  public readonly name: string = 'StringType';
  public annotations: StringTypeAnnotations = {
    constraintType: ConstraintType.string, // TODO
  };

  public required(message?: string) {
    this.annotations.required = { required: true, message: message };
    return this;
  }

  public pattern(pattern: RegExp, message?: string) {
    this.annotations.pattern = { pattern: pattern, message: message };
    return this;
  }
}

export class BooleanType2 extends AnnotationType<BooleanTypeAnnotations> {
  public readonly name: string = 'BooleanType';
  public annotations: BooleanTypeAnnotations = {
    constraintType: ConstraintType.boolean, // TODO
  };

  public required(message?: string) {
    this.annotations.required = { required: true, message: message };
    return this;
  }

  public equals(v: boolean, message?: string) {
    this.annotations.equals = { equals: v, message: message };
    return this;
  }
}

export function string() {
  return new StringType2();
}

export function boolean() {
  return new BooleanType2();
}
