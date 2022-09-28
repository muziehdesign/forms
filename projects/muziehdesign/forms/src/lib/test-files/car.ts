import { StringType, length, required, pattern, min, max, maxLength, minLength, DateType, test, NumberType } from '../type-annotations';

export class Car {
  @NumberType(required('Please enter a valid top speed'), min(0, 'Please enter a valid top speed'), max(2000, 'Please enter a valid top speed'))
  topSpeed?: number;

  @StringType(required('Please enter a valid brand'), minLength(2, 'Brand requires at least 2 characters'), maxLength(200, 'Brand cannot exceed 200 characters'), pattern(/^[A-Za-z\s]*$/, 'Please enter a valid brand'))
  brand?: string;

  @StringType(length(7, 'Please enter a valid hex color'))
  hexColor?: string;

  @DateType(test('nextOilChange', (d: Date) => !d || d > new Date(), 'Please enter a valid oil change'))
  nextOilChange?: Date;

  @DateType(min(new Date(1800, 1, 1), 'Please enter a valid inscription date'), max(new Date(), 'Please enter a valid inscription date'))
  inscriptionDate?: Date;
}
