import { FieldError } from "./field-error";

export interface ModelStateResult<T> {
  valid: boolean;
  errors: FieldError[];
  model: T;
}
