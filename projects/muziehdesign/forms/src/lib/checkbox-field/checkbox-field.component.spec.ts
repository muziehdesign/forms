import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCheckboxField } from './checkbox-field.component';

describe('CheckboxFieldComponent', () => {
  let component: MzCheckboxField;
  let fixture: ComponentFixture<MzCheckboxField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MzCheckboxField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MzCheckboxField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
