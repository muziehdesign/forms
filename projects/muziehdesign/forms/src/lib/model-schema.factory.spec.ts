import { TestBed } from '@angular/core/testing';

import { ModelSchemaFactory as ModelSchemaFactory } from './model-schema.factory';

describe('ModelSchemaFactory', () => {
  let service: ModelSchemaFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSchemaFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
