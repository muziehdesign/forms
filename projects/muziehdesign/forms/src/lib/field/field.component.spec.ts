import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MzField } from './field.component';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

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
  @ViewChild('testForm') form!: NgForm;
}

interface TestHostModel {
  textField?: string;
}

describe('MzField', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [MzField, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeTruthy();
    expect(Object.keys(component.form.controls).length).toBe(1);
  });
});
