import { StringType, length, required, pattern, maxLength } from '../type-annotations';

export class Car {
  @StringType(required('Please enter a valid top speed'), pattern(/[0-9]$/, 'Please enter a valid top speed'))
  topSpeed?: number;

  @StringType(required('Please enter a valid brand'), maxLength(200, 'Brand cannot exceed 200 characters'))
  brand?: string;

  @StringType(required('Please enter a valid year'), pattern(/[0-9]$/, 'Please enter a valid year'))
  year?: number;
}
