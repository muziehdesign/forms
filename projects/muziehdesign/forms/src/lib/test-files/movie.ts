import { required, FileType } from '../type-annotations';

export class Movie {
  @FileType(required('Please select a file'))
  movie?: File;
}
