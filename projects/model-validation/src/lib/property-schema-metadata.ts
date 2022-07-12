import { PropertyType } from "./property-type.enum";

export interface PropertySchemaMetadata<T> {
  name: string;
  type: PropertyType;
  options: T;
}
