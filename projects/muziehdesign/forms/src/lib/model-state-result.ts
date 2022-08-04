import { FieldError } from "./field-error";

export interface ModelStateResult {
  valid: boolean;
  errors: FieldError[];
}
