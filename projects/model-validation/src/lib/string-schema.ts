import 'reflect-metadata';

export interface StringSchemaOptions {
  required: boolean;
  length?: number;
  minimum?: number;
  maximum?: number;
  pattern?: RegExp;
}

export function StringSchema(options?: StringSchemaOptions) {
  return function(target: Object, propertyKey: string | Symbol) {
    const metadata = Reflect.getMetadata('custom:muziehdesign:schema', target) || [];
    // TODO: add
    Reflect.defineMetadata('custom:muziehdesign:schema', metadata, target);
  }
}
