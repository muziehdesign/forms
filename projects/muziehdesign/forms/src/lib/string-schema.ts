import 'reflect-metadata';
import { PropertySchemaMetadata } from './property-schema-metadata';
import { PropertyType } from './property-type.enum';

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
