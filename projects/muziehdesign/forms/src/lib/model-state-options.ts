import { FieldError } from './field-error';

export interface ModelStateOptions {
  onValidate: (errors: FieldError[]) => Promise<FieldError[]>;
}
