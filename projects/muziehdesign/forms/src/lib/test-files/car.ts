import { StringType, length, required, pattern, min, max, maxLength, minLength, DateType, test } from '../type-annotations';

export class Car {
  @StringType(required('Please enter a valid top speed'), pattern(/[0-9]$/, 'Please enter a valid top speed'))
  topSpeed?: number;

  @StringType(required('Please enter a valid brand'), minLength(2, 'Brand requires at least 2 characters'), maxLength(200, 'Brand cannot exceed 200 characters'))
  brand?: string;

  @StringType(required('Please enter a valid year'), length(4, 'Please enter a valid year'), pattern(/[0-9]$/, 'Please enter a valid year'))
  year?: number;

  @DateType(test('nextOilChange', (d: Date) => !d || d > new Date(), 'Please enter a valid oil change'))
  nextOilChange?: Date;

  @DateType(min(new Date(1800, 1, 1), 'Please enter a valid inscription date'), max(new Date(), 'Please enter a valid inscription date'))
  inscriptionDate?: Date;
}
