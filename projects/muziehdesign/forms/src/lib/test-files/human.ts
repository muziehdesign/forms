import { required, DateType } from '../type-annotations';

export class Human {
  @DateType(required('Please enter a birth date'))
  birthDate?: Date;
}
