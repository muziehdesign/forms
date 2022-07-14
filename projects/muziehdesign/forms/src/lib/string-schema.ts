import 'reflect-metadata';
import { PropertySchemaMetadata } from './property-schema-metadata';
import { PropertyType } from './property-type.enum';

const METADATA_KEY = 'custom:muziehdesign:annotations';

export interface StringSchemaOptions extends SchemaOptions {
  length?: number;
  minimum?: number;
  maximum?: number;
  pattern?: RegExp;
}
export interface SchemaOptions {
  required?: boolean;
}

export function StringSchema(options?: StringSchemaOptions) {
  return function (target: Object, propertyKey: string | Symbol) {
    const metadata = Reflect.getMetadata('custom:muziehdesign:schema', target) || [];
    metadata.push(<PropertySchemaMetadata<StringSchemaOptions>>{
      name: propertyKey,
      type: PropertyType.string,
      options: options,
    });
    // TODO: define on property
    Reflect.defineMetadata('custom:muziehdesign:schema', metadata, target);
  };
}

export interface BooleanSchemaOptions extends SchemaOptions {
  equals?: boolean;
}

export function BooleanSchema(options?: BooleanSchemaOptions) {
  return function (target: Object, propertyKey: string | Symbol) {
    const metadata = Reflect.getMetadata('custom:muziehdesign:schema', target) || [];
    metadata.push(<PropertySchemaMetadata<StringSchemaOptions>>{
      name: propertyKey,
      type: PropertyType.boolean,
      options: options,
    });
    // TODO: define on property
    Reflect.defineMetadata('custom:muziehdesign:schema', metadata, target);
  };
}

export interface AnnotationOptions {
  errorMessage?: string;
}

export interface PropertyAnnotation<T> {
  type: string;
  errorMessage?: string;
  specification: T;
}

export interface RequiredAnnotation {}

export interface EqualsValueAnnotation {
  value?: any;
}

export interface PropertyAnnotations extends AnnotationOptions {
  type: string;
}

export function Required(options?: AnnotationOptions) {
  return function (target: Object, propertyKey: string) {
    const metadata: Map<string, PropertyAnnotations[]> = Reflect.getMetadata(METADATA_KEY, target) || new Map<string, PropertyAnnotation<any>[]>();
    const annotations = metadata.get(propertyKey) || [];
    annotations.push({ type: Required.name, errorMessage: options?.errorMessage });
    metadata.set(propertyKey, annotations);
    Reflect.defineMetadata(METADATA_KEY, metadata, target);
  };
}

export function Equals<T>(value: T, options?: AnnotationOptions) {
  return function (target: Object, propertyKey: string) {
    const metadata: Map<string, PropertyAnnotations[]> = Reflect.getMetadata(METADATA_KEY, target) || new Map<string, PropertyAnnotation<any>[]>();
    const annotations = metadata.get(propertyKey) || [];
    annotations.push(<PropertyAnnotation<EqualsValueAnnotation>>{ type: Equals.name, errorMessage: options?.errorMessage, specification: { value: value } });
    metadata.set(propertyKey, annotations);
    Reflect.defineMetadata(METADATA_KEY, metadata, target);
  };
}
