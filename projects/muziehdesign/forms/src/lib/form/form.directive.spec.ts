import { NgForm } from '@angular/forms';
import { MzForm } from './form.directive';

describe('FormDirective', () => {
  it('should create an instance', () => {
    const directive = new MzForm(jasmine.createSpyObj<NgForm>('NgForm', ['errors']));
    expect(directive).toBeTruthy();
  });
});
