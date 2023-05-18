import { TestBed } from '@angular/core/testing';

import { ModelSchemaFactory as ModelSchemaFactory } from './model-schema.factory';
import { Car } from './test-files/car';
import { Human } from './test-files/human';
import { Movie } from './test-files/movie';

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
      hexColor: '#ffffff',
      nextOilChange: new Date(new Date().getFullYear() + 5, 1, 1),
      inscriptionDate: new Date(new Date().getFullYear() - 2, 1, 1),
      tested: true,
      doors: ['front'],
    } as Car);

    expect(service).toBeTruthy();
    expect(validation.length).toBe(0);
  });

  describe('string validations', () => {
    it('should validate required string', async () => {
      const builtFactory = service.build(new Car());
      const validation = await builtFactory.validate({ topSpeed: 200, tested: true, doors: ['front'] } as Car);

      expect(validation).toEqual([{ path: 'brand', type: 'required', message: 'Please enter a valid brand' }]);
    });

    it('should validate minlength', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({ topSpeed: 200, brand: 'a', tested: true, doors: ['front'] } as Car);

      expect(validation).toEqual([{ path: 'brand', type: 'min', message: 'Brand requires at least 2 characters' }]);
    });

    it('should validate maxlength', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({
        topSpeed: 200,
        brand: 'Audi '.repeat(500),
        nextOilChange: new Date(new Date().getFullYear() + 5, 1, 1),
        tested: true,
        doors: ['front'],
      } as Car);

      expect(validation).toEqual([{ path: 'brand', type: 'max', message: 'Brand cannot exceed 200 characters' }]);
    });

    it('should validate regex', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({
        topSpeed: 200,
        brand: 'Audi %',
        nextOilChange: new Date(new Date().getFullYear() + 5, 1, 1),
        tested: true,
        doors: ['front'],
      } as Car);

      expect(validation).toEqual([{ path: 'brand', type: 'matches', message: 'Please enter a valid brand' }]);
    });

    it('should validate length', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({ brand: 'Audi', hexColor: '#333', topSpeed: 100, tested: true, doors: ['front'] } as Car);

      expect(validation).toEqual([{ path: 'hexColor', type: 'length', message: 'Please enter a valid hex color' }]);
    });
  });

  describe('number validations', () => {
    it('should validate required number', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({ brand: 'Audi', tested: true, doors: ['front'] } as Car);

      expect(validation).toEqual([{ path: 'topSpeed', type: 'required', message: 'Please enter a valid top speed' }]);
    });

    it('should validate min number', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({ brand: 'Audi', topSpeed: -1, tested: true, doors: ['front'] } as Car);

      expect(validation).toEqual([{ path: 'topSpeed', type: 'min', message: 'Please enter a valid top speed' }]);
    });

    it('should validate max number', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({ brand: 'Audi', topSpeed: 3000, tested: true, doors: ['front'] } as Car);

      expect(validation).toEqual([{ path: 'topSpeed', type: 'max', message: 'Please enter a valid top speed' }]);
    });
  });

  describe('array validations', () => {
    it('should validate min count of array', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({ brand: 'Audi', doors: [], topSpeed: 35, tested: true } as Car);

      expect(validation).toEqual([{ path: 'doors', type: 'min', message: 'Please enter at least one door type' }]);
    });

    it('should validate max count of array', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({ brand: 'Audi', doors: ['front', 'back', 'hatchback'], topSpeed: 35, tested: true } as Car);

      expect(validation).toEqual([{ path: 'doors', type: 'max', message: 'Only 2 door types allowed' }]);
    });
  });

  describe('date validations', () => {
    it('should validate min date', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({
        topSpeed: 200,
        brand: 'Toyota',
        inscriptionDate: new Date(1799, 1, 1),
        tested: true,
        doors: ['front'],
      } as Car);

      expect(validation).toEqual([{ path: 'inscriptionDate', type: 'min', message: 'Please enter a valid inscription date' }]);
    });

    it('should validate max date', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({
        topSpeed: 200,
        brand: 'Toyota',
        inscriptionDate: new Date(new Date().getFullYear() + 5, 1, 1),
        tested: true,
        doors: ['front'],
      } as Car);

      expect(validation).toEqual([{ path: 'inscriptionDate', type: 'max', message: 'Please enter a valid inscription date' }]);
    });

    it('should validate date test', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({
        topSpeed: 200,
        brand: 'Toyota',
        inscriptionDate: new Date(new Date().getFullYear() - 2, 1, 1),
        nextOilChange: new Date(new Date().getFullYear() - 2, 1, 1),
        tested: true,
        doors: ['front'],
      } as Car);

      expect(validation).toEqual([{ path: 'nextOilChange', type: 'nextOilChange', message: 'Please enter a valid oil change' }]);
    });

    it('should require a date test', async () => {
      const builtFactory = service.build(new Human());

      const validation = await builtFactory.validate({} as Human);

      expect(validation).toEqual([{ path: 'birthDate', type: 'required', message: 'Please enter a birth date' }]);
    });

    it('should use default typeError text when js Date object is not valid', async () => {
      const builtFactory = service.build(new Human());

      const validation = await builtFactory.validate({ birthDate: new Date('hi, I am invalid') } as Human);

      expect(validation).toEqual([
        { path: 'birthDate', type: 'typeError', message: 'birthDate must be a `date` type, but the final value was: `Invalid Date` (cast from the value `Invalid Date`).' },
      ]);
    });
  });

  describe('boolean validations', () => {
    it('should validate required boolean', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({
        topSpeed: 200,
        brand: 'Toyota',
        doors: ['front'],
      } as Car);

      expect(validation).toEqual([{ path: 'tested', type: 'required', message: 'The car needs to be tested before use' }]);
    });

    it('should validate true match', async () => {
      const builtFactory = service.build(new Car());

      const validation = await builtFactory.validate({
        topSpeed: 200,
        brand: 'Toyota',
        tested: false,
        doors: ['front'],
      } as Car);

      expect(validation).toEqual([{ path: 'tested', type: 'is-value', message: 'The car needs to be tested before use' }]);
    });
  });

  describe('file validations', () => {
    it('should validate required file', async () => {
      const builtFactory = service.build(new Movie());

      const content = Uint8Array.from([0xff, 0xD8, 0xFF, 0xE0]);

      const validation = await builtFactory.validate({
        movie: new File([content], 'test.jpg', { type: 'image/jpg' })
      } as Movie);

      expect(service).toBeTruthy();
      expect(validation.length).toBe(0);
    });

    it('should fail required file validation', async () => {
      const builtFactory = service.build(new Movie());

      const validation = await builtFactory.validate({} as Movie);

      expect(validation).toEqual([{ path: 'movie', type: 'required', message: 'Please select a file' }]);
    });
  });
});
