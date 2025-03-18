import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MzField } from './field.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MzForm } from '../form/form.directive';

@Component({
  template: `
      <form #testForm="ngForm">
          <mz-field label="My label">
            <input type="text" [(ngModel)]="model.textField" name="textField" />
          </mz-field>
      </form>
  `,
})
class TestHostComponent {
  model = {} satisfies TestHostModel;
}

interface TestHostModel {
  textField?: string;
}

describe('MzField', () => {
  let component: MzField;
  let fixture: ComponentFixture<MzField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [MzField, FormsModule]
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
