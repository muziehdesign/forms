import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateValueAccessor } from './date-value-accessor.directive';

@Component({
  template: `<input type="date" [(ngModel)]="date" appDate />`
})
class TestComponent {
  date?: Date;
}

describe('DateValueAccessorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DateValueAccessor],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    input = fixture.nativeElement.querySelector('input');
  });

  it('should initialize with null date', () => {
    expect(component.date).toBeNull();
  });

  it('should update ngModel when user enters a valid date', () => {
    input.value = '2025-01-01';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.date).toEqual(new Date(2025, 0, 1));
  });

  it('should set ngModel to null when input is cleared', () => {
    component.date = new Date(2025, 0, 1);
    fixture.detectChanges();
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.date).toBeNull();
  });

  it('should update input field when ngModel changes', () => {
    component.date = new Date(2025, 0, 1);
    fixture.detectChanges();

    expect(input.value).toBe('2025-01-01');
  });
});
