import { ConstraintAnnotations } from "./type-annotations";

export interface FieldSchema<T extends ConstraintAnnotations>  {
    name: string;
    type: string;
    label: string;
    constraints: T;
  }