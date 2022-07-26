import 'reflect-metadata';

const METADATA_KEY = 'custom:muziehdesign:annotations';

export enum ConstraintType {
  string,
  boolean,
  date,
}

export interface ConstraintAnnotations {
  constraintType: ConstraintType;
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
  test?: TestAnnotation;
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

export interface TestAnnotation extends ValidationAnnotation {
  test: (d:Date) => boolean;
  name: string;
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

export function Annotate<T extends ConstraintAnnotations>(a: AnnotationType<T>) {
  return function (target: Object, propertyKey: string) {
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

export function DateType(...annotations: { [key: string]: ValidationAnnotation }[]) {
  return function (target: Object, propertyKey: string) {
    const o = Object.assign({}, ...annotations) as DateTypeAnnotations;
    o.constraintType = ConstraintType.date;
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

export function min<T>(value: T, message?: string): { [key: string]: MinimumAnnotation<T> } {
  return { min: { min: value, message: message } };
}

export function max<T>(value: T, message?: string): { [key: string]: MaximumAnnotation<T> } {
  return { max: { max: value, message: message } };
}

export function test(name: string, test: (d:Date) => boolean, message?: string): { [key: string]: TestAnnotation } {
  return { test: { name: name, test: test, message: message } };
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

export class DateType2 extends AnnotationType<DateTypeAnnotations> {
  public readonly name: string = 'DateType';
  public annotations: DateTypeAnnotations = {
    constraintType: ConstraintType.date, // TODO
  };

  public required(message?: string) {
    this.annotations.required = { required: true, message: message };
    return this;
  }

  public min(v: Date, message?: string) {
    this.annotations.min = { min: v, message: message };
    return this;
  }

  public max(v: Date, message?: string) {
    this.annotations.max = { max: v, message: message };
    return this;
  }

  public test(name: string, v: (d: Date) => boolean, message?: string) {
    this.annotations.test = { name: name, test: v, message: message };
    return this;
  }
}

export function date() {
  return new DateType2();
}
