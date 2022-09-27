import { TestBed } from '@angular/core/testing';

import { ModelSchemaFactory as ModelSchemaFactory } from './model-schema.factory';
import { Car } from './test-files/car';

describe('ModelSchemaFactory', () => {
  let service: ModelSchemaFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);
  });

  // it('should go through happy path', async () => {
  //   const builtFactory = service.build(new Car());

  //   const carWithInvalidYear: Car = { topSpeed: 200, brand: 'Audi Audi Audi Audi Audi Audi Audi Audi Audi Audi Audi', year: '2010a' as unknown as number };

  //   const validation = await builtFactory.validate(carWithInvalidYear);

  //   expect(service).toBeTruthy();
  //   expect(validation.length).toBe(2);
  //   expect(validation[0]).toEqual({ path: 'brand', type: 'length', message: 'Brand cannot exceed 200 characters' });
  //   expect(validation[1]).toEqual({ path: 'year', type: 'matches', message: 'Please enter a valid year' });
  // });

  it('should create and validate regex', async () => {
    const builtFactory = service.build(new Car());

    const carWithInvalidYear: Car = { topSpeed: 200, brand: 'Audi ', year: '2010a' as unknown as number };

    const validation = await builtFactory.validate(carWithInvalidYear);

    expect(service).toBeTruthy();
    expect(validation.length).toBe(1);
    expect(validation[0]).toEqual({ path: 'year', type: 'matches', message: 'Please enter a valid year' });
  });

  it('should create and validate maxlength', async () => {
    const builtFactory = service.build(new Car());

    const carWithInvalidYear: Car = { topSpeed: 200, brand: 'Audi '.repeat(500), year: 2010 };

    const validation = await builtFactory.validate(carWithInvalidYear);

    expect(service).toBeTruthy();
    expect(validation.length).toBe(1);
    expect(validation[0]).toEqual({ path: 'brand', type: 'max', message: 'Brand cannot exceed 200 characters' });
  });

  it('should validate required', async () => {
    const builtFactory = service.build(new Car());

    const carWithInvalidUnprovidedSpeed: Car = { brand: 'Audi', year: 2010 };

    const validation = await builtFactory.validate(carWithInvalidUnprovidedSpeed);

    expect(validation.length).toBe(1);
    expect(validation[0]).toEqual({ path: 'topSpeed', type: 'required', message: 'Please enter a valid top speed' });
  });
});
