import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MzField } from './field.component';

describe('MzField', () => {
  let component: MzField;
  let fixture: ComponentFixture<MzField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MzField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MzField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
