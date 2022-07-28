import 'reflect-metadata';

const METADATA_KEY = 'custom:muziehdesign:annotations';

export enum ConstraintType {
  string,
  boolean,
  date,
  object,
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
  test?: TestAnnotation<Date>;
}

export interface ObjectTypeAnnotations extends ConstraintAnnotations {
  required?: RequiredAnnotation;
  getInstance: () => any;
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

const registerMetadata = (target: Object, propertyKey: string, constraint: ConstraintAnnotations) => {
  const metadata: Map<string, any> = Reflect.getMetadata(METADATA_KEY, target) || new Map<string, any>();
  metadata.set(propertyKey, constraint);
  Reflect.defineMetadata(METADATA_KEY, metadata, target);
};

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

export function ObjectType<T>(type: { new (): T }, ...annotations: { [key: string]: ValidationAnnotation }[]) {
  return function (target: Object, propertyKey: string) {
    const o = Object.assign({}, ...annotations, { getInstance: () => new type() } as Partial<ObjectTypeAnnotations>) as ObjectTypeAnnotations;
    o.constraintType = ConstraintType.object;
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

export function test<T>(name: string, test: (d: T) => boolean, message?: string): { [key: string]: TestAnnotation<T> } {
  return { test: { name: name, test: test, message: message } };
}
