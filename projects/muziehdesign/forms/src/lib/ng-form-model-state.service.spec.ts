import { TestBed } from '@angular/core/testing';

import { NgFormModelStateFactory } from './ng-form-model-state.service';

describe('NgFormModelStateService', () => {
  let service: NgFormModelStateFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgFormModelStateFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
