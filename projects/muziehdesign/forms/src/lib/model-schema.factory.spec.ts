import { TestBed } from '@angular/core/testing';

import { ModelSchemaFactory as ModelSchemaFactory } from './model-schema.factory';
import { Car } from './test-files/car';

describe('ModelSchemaFactory', () => {
  let service: ModelSchemaFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);
  });

  it('should go through happy path', async () => {
    const builtFactory = service.build(new Car());

    const validation = await builtFactory.validate({
      topSpeed: 200,
      brand: 'Audi',
      year: 2010,
      nextOilChange: new Date(new Date().getFullYear() + 5, 1, 1),
      inscriptionDate: new Date(new Date().getFullYear() - 2, 1, 1),
    } as Car);

    expect(service).toBeTruthy();
    expect(validation.length).toBe(0);
  });

  it('should create and validate regex', async () => {
    const builtFactory = service.build(new Car());

    const validation = await builtFactory.validate({
      topSpeed: 200,
      brand: 'Audi ',
      year: '201a' as unknown as number,
      nextOilChange: new Date(new Date().getFullYear() + 5, 1, 1),
    } as Car);

    expect(service).toBeTruthy();
    expect(validation).toEqual([{ path: 'year', type: 'matches', message: 'Please enter a valid year' }]);
  });

  it('should validate maxlength', async () => {
    const builtFactory = service.build(new Car());

    const validation = await builtFactory.validate({
      topSpeed: 200,
      brand: 'Audi '.repeat(500),
      year: 2010,
      nextOilChange: new Date(new Date().getFullYear() + 5, 1, 1),
    } as Car);

    expect(service).toBeTruthy();
    expect(validation).toEqual([{ path: 'brand', type: 'max', message: 'Brand cannot exceed 200 characters' }]);
  });

  it('should validate required', async () => {
    const builtFactory = service.build(new Car());
    const validation = await builtFactory.validate({ topSpeed: 200, year: 2010 } as Car);

    expect(validation).toEqual([{ path: 'brand', type: 'required', message: 'Please enter a valid brand' }]);
  });

  it('should validate minlength', async () => {
    const builtFactory = service.build(new Car());

    const validation = await builtFactory.validate({ topSpeed: 200, brand: 'a', year: 2010 } as Car);

    expect(validation).toEqual([{ path: 'brand', type: 'min', message: 'Brand requires at least 2 characters' }]);
  });

  it('should validate maxlength and length simultaneously', async () => {
    const builtFactory = service.build(new Car());

    const validation = await builtFactory.validate({ brand: 'Audi '.repeat(200), year: 123 } as Car);

    const sortedErrors = validation.sort((a, b) => a.path.localeCompare(b.path));

    expect(sortedErrors).toEqual([
      { path: 'brand', type: 'max', message: 'Brand cannot exceed 200 characters' },
      { path: 'topSpeed', type: 'required', message: 'Please enter a valid top speed' },
      { path: 'year', type: 'length', message: 'Please enter a valid year' },
    ]);
  });

  it('should validate min date', async () => {
    const builtFactory = service.build(new Car());

    const validation = await builtFactory.validate({
      topSpeed: 200,
      brand: 'Toyota',
      year: 2010,
      inscriptionDate: new Date(1799, 1, 1),
    } as Car);

    expect(validation).toEqual([{ path: 'inscriptionDate', type: 'min', message: 'Please enter a valid inscription date' }]);
  });

  it('should validate min date', async () => {
    const builtFactory = service.build(new Car());

    const validation = await builtFactory.validate({
      topSpeed: 200,
      brand: 'Toyota',
      year: 2010,
      inscriptionDate: new Date(new Date().getFullYear() + 5, 1, 1),
    } as Car);

    expect(validation).toEqual([{ path: 'inscriptionDate', type: 'max', message: 'Please enter a valid inscription date' }]);
  });

  it('should validate date test', async () => {
    const builtFactory = service.build(new Car());

    const validation = await builtFactory.validate({
      topSpeed: 200,
      brand: 'Toyota',
      year: 2010,
      inscriptionDate: new Date(new Date().getFullYear() - 2, 1, 1),
      nextOilChange: new Date(new Date().getFullYear() - 2, 1, 1),
    } as Car);

    expect(validation).toEqual([{ path: 'nextOilChange', type: 'nextOilChange', message: 'Please enter a valid oil change' }]);
  });
});
