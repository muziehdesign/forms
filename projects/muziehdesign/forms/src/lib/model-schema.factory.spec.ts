import { TestBed } from '@angular/core/testing';
import { ModelSchemaFactory as ModelSchemaFactory } from './model-schema.factory';
import { ArrayTestModel, BooleanTestModel, DateTestModel, FileTestModel, NestedObjectModel, NumberTestModel, StringTestModel } from './test-files/annotation-test-models';
import { ModelSchema } from './model-schema';

describe('ModelSchemaFactory validates string', () => {
  let service: ModelSchemaFactory;
  const validModel = new StringTestModel();
  let schema: ModelSchema<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);

    validModel.requiredEntry = 'required';
    schema = service.build(validModel);
    const validation = await schema.validate(validModel);
    expect(validation).toEqual([]);
  });

  it('should validate required string', async () => {
    for (const invalidValue of [undefined, '']) {
      const target = Object.assign({}, validModel) as StringTestModel;
      target.requiredEntry = invalidValue;

      const validation = await schema.validate(target);
      expect(validation).toEqual([{ path: 'requiredEntry', type: 'required', message: 'requiredEntry is a required field' }]);
    }

    for (const validValue of [' ', '  ', 'abc']) {
      const target = Object.assign({}, validModel) as StringTestModel;
      target.requiredEntry = validValue;

      const validation = await schema.validate(target);
      expect(validation).toEqual([]);
    }
  });

  it('should validate minlength', async () => {
    const target = Object.assign({}, validModel) as StringTestModel;
    target.minLengthEntry = '';
    const validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'minLengthEntry', type: 'min', message: 'minLengthEntry must be at least 5 characters' }]);
  });

  it('should validate max', async () => {
    const target = Object.assign({}, validModel) as StringTestModel;
    target.maxLengthEntry = '123456789012345';
    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'maxLengthEntry', type: 'max', message: 'maxLengthEntry must be at most 10 characters' }]);

    target.maxLengthEntry = '';
    validation = await schema.validate(target);
    expect(validation).toEqual([]);
  });

  it('should validate regex', async () => {
    const target = Object.assign({}, validModel) as StringTestModel;
    target.patternEntry = 'muziehdeeeeesign';
    let validation = await schema.validate(target);
    expect(validation).toEqual([]);

    target.patternEntry = 'muziehdsign';
    validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'patternEntry', type: 'matches', message: 'patternEntry must match the following: "/muziehd(e+)sign/g"' }]);
  });

  it('should validate length', async () => {
    const target = Object.assign({}, validModel) as StringTestModel;
    target.lengthEntry = '123456789012345';
    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'lengthEntry', type: 'length', message: 'lengthEntry must be exactly 5 characters' }]);
  });
});

describe('ModelSchemaFactory validates number', () => {
  let service: ModelSchemaFactory;
  const validModel = new NumberTestModel();
  let schema: ModelSchema<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);

    validModel.requiredEntry = 5;
    schema = service.build(validModel);
    const validation = await schema.validate(validModel);
    expect(validation).toEqual([]);
  });

  it('should validate required number', async () => {
    for (const invalidValue of [undefined]) {
      const target = Object.assign({}, validModel) as NumberTestModel;
      target.requiredEntry = invalidValue;

      const validation = await schema.validate(target);
      expect(validation).toEqual([{ path: 'requiredEntry', type: 'required', message: 'requiredEntry is a required field' }]);
    }

    for (const validValue of [0, 1, -2]) {
      const target = Object.assign({}, validModel) as NumberTestModel;
      target.requiredEntry = validValue;

      const validation = await schema.validate(target);
      expect(validation).toEqual([]);
    }
  });

  it('should validate min number', async () => {
    const target = Object.assign({}, validModel) as NumberTestModel;
    target.minEntry = 1;

    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'minEntry', type: 'min', message: 'minEntry must be greater than or equal to 5' }]);

    target.minEntry = 6;
    validation = await schema.validate(target);
    expect(validation).toEqual([]);
  });

  it('should validate max number', async () => {
    const target = Object.assign({}, validModel) as NumberTestModel;
    target.maxEntry = 11;

    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'maxEntry', type: 'max', message: 'maxEntry must be less than or equal to 10' }]);

    target.maxEntry = 10;
    validation = await schema.validate(target);
    expect(validation).toEqual([]);
  });
});

describe('ModelSchemaFactory validates array', () => {
  let service: ModelSchemaFactory;
  const validModel = new ArrayTestModel();
  let schema: ModelSchema<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);

    schema = service.build(validModel);
    const validation = await schema.validate(validModel);
    expect(validation).toEqual([]);
  });

  it('should validate min length', async () => {
    const target = Object.assign({}, validModel) as ArrayTestModel;
    target.minEntry = ['1', '2', '3', '4'];

    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'minEntry', type: 'min', message: 'minEntry field must have at least 5 items' }]);

    target.minEntry = ['1', '2', '3', '4', '5'];
    validation = await schema.validate(target);
    expect(validation).toEqual([]);
  });

  it('should validate max length', async () => {
    const target = Object.assign({}, validModel) as ArrayTestModel;
    target.maxEntry = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'maxEntry', type: 'max', message: 'maxEntry field must have less than or equal to 10 items' }]);

    target.maxEntry = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    validation = await schema.validate(target);
    expect(validation).toEqual([]);
  });
});

describe('ModelSchemaFactory validates number', () => {
  let service: ModelSchemaFactory;
  const validModel = new NumberTestModel();
  let schema: ModelSchema<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);

    validModel.requiredEntry = 5;
    schema = service.build(validModel);
    const validation = await schema.validate(validModel);
    expect(validation).toEqual([]);
  });

  it('should validate required number', async () => {
    for (const invalidValue of [undefined]) {
      const target = Object.assign({}, validModel) as NumberTestModel;
      target.requiredEntry = invalidValue;

      const validation = await schema.validate(target);
      expect(validation).toEqual([{ path: 'requiredEntry', type: 'required', message: 'requiredEntry is a required field' }]);
    }

    for (const validValue of [0, 1, -2]) {
      const target = Object.assign({}, validModel) as NumberTestModel;
      target.requiredEntry = validValue;

      const validation = await schema.validate(target);
      expect(validation).toEqual([]);
    }
  });

  it('should validate min number', async () => {
    const target = Object.assign({}, validModel) as NumberTestModel;
    target.minEntry = 1;

    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'minEntry', type: 'min', message: 'minEntry must be greater than or equal to 5' }]);

    target.minEntry = 6;
    validation = await schema.validate(target);
    expect(validation).toEqual([]);
  });

  it('should validate max number', async () => {
    const target = Object.assign({}, validModel) as NumberTestModel;
    target.maxEntry = 11;

    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'maxEntry', type: 'max', message: 'maxEntry must be less than or equal to 10' }]);

    target.maxEntry = 10;
    validation = await schema.validate(target);
    expect(validation).toEqual([]);
  });
});

describe('ModelSchemaFactory validates date', () => {
  let service: ModelSchemaFactory;
  const validModel = new DateTestModel();
  let schema: ModelSchema<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);

    validModel.requiredEntry = new Date();
    schema = service.build(validModel);
    const validation = await schema.validate(validModel);
    expect(validation).toEqual([]);
  });

  it('should validate required date', async () => {
    for (const invalidValue of [undefined]) {
      const target = Object.assign({}, validModel) as DateTestModel;
      target.requiredEntry = invalidValue;

      const validation = await schema.validate(target);
      expect(validation).toEqual([{ path: 'requiredEntry', type: 'required', message: 'requiredEntry is a required field' }]);
    }

    for (const validValue of [new Date()]) {
      const target = Object.assign({}, validModel) as DateTestModel;
      target.requiredEntry = validValue;

      const validation = await schema.validate(target);
      expect(validation).toEqual([]);
    }
  });

  it('should validate min date', async () => {
    const target = Object.assign({}, validModel) as DateTestModel;
    target.minEntry = new Date(1999, 11, 31);

    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'minEntry', type: 'min', message: `minEntry field must be later than ${new Date(2000, 0, 5).toISOString()}` }]);

    target.minEntry = new Date(2000, 0, 5);
    validation = await schema.validate(target);
    expect(validation).toEqual([]);
  });

  it('should validate max date', async () => {
    const target = Object.assign({}, validModel) as DateTestModel;
    target.maxEntry = new Date(2000, 0, 11);

    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'maxEntry', type: 'max', message: `maxEntry field must be at earlier than ${new Date(2000, 0, 10).toISOString()}` }]);

    target.maxEntry = new Date(2000, 0, 10);
    validation = await schema.validate(target);
    expect(validation).toEqual([]);
  });
});

describe('ModelSchemaFactory validates boolean', () => {
  let service: ModelSchemaFactory;
  const validModel = new BooleanTestModel();
  let schema: ModelSchema<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);

    validModel.requiredEntry = false;
    schema = service.build(validModel);
    const validation = await schema.validate(validModel);
    expect(validation).toEqual([]);
  });

  it('should validate required boolean', async () => {
    for (const invalidValue of [undefined]) {
      const target = Object.assign({}, validModel) as BooleanTestModel;
      target.requiredEntry = invalidValue;

      const validation = await schema.validate(target);
      expect(validation).toEqual([{ path: 'requiredEntry', type: 'required', message: 'requiredEntry is a required field' }]);
    }

    for (const validValue of [true, false]) {
      const target = Object.assign({}, validModel) as BooleanTestModel;
      target.requiredEntry = validValue;

      const validation = await schema.validate(target);
      expect(validation).toEqual([]);
    }
  });

  it('should validate is value', async () => {
    const target = Object.assign({}, validModel) as BooleanTestModel;
    target.equalsEntry = false;

    let validation = await schema.validate(target);
    expect(validation).toEqual([{ path: 'equalsEntry', type: 'is-value', message: 'equalsEntry field must be true' }]);

    target.equalsEntry = true;
    validation = await schema.validate(target);
    expect(validation).toEqual([]);
  });
});

describe('ModelSchemaFactory validates file', () => {
  let service: ModelSchemaFactory;
  const validModel = new FileTestModel();
  let schema: ModelSchema<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);

    validModel.requiredEntry = new File([], 'test.jpg');
    schema = service.build(validModel);
    const validation = await schema.validate(validModel);
    expect(validation).toEqual([]);
  });

  it('should validate required file', async () => {
      const target = Object.assign({}, validModel) as FileTestModel;
      target.requiredEntry = undefined;
      let validation = await schema.validate(target);
      expect(validation).toEqual([{ path: 'requiredEntry', type: 'required', message: 'requiredEntry is a required field' }]);

      target.requiredEntry = new File([], 'test.jpg');
      validation = await schema.validate(target);
      expect(validation).toEqual([]);
  });
});


describe('ModelSchemaFactory validates nested object', () => {
  let service: ModelSchemaFactory;
  const validModel = new NestedObjectModel();
  let schema: ModelSchema<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);

    validModel.requiredEntry = new StringTestModel();
    validModel.requiredEntry.requiredEntry = 'abc';
    schema = service.build(validModel);
    const validation = await schema.validate(validModel);
    expect(validation).toEqual([]);
  });

  it('should validate required object', async () => {
      const target = Object.assign({}, validModel) as NestedObjectModel;
      target.requiredEntry = undefined;
      let validation = await schema.validate(target);
      expect(validation).toEqual([{ path: 'requiredEntry.requiredEntry', type: 'required', message: 'requiredEntry.requiredEntry is a required field' }]);

      target.requiredEntry = new StringTestModel();
      target.requiredEntry.requiredEntry = 'abc';
      validation = await schema.validate(target);
      expect(validation).toEqual([]);
  });
});