import { required, DateType, ObjectType } from '../type-annotations';
import { Human } from './human';
import { Movie } from './movie';

export class Cat {
  @ObjectType(Human)
  humanPet?: Human;

  @ObjectType(Movie, required())
  catMovie?: Movie;
}
