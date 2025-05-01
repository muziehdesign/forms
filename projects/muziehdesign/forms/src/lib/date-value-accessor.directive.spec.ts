import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateValueAccessor } from './date-value-accessor.directive';

@Component({
    template: `
    <input type="date" [(ngModel)]="date" mzDate name="date" />
    <input type="text" [(ngModel)]="textDate" mzDate name="textDate" />
  `,
    standalone: false
})
class TestComponent {
  date?: Date;
  textDate?: Date;
}

describe('DateValueAccessor', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let dateInput: HTMLInputElement;
  let textInput: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FormsModule, DateValueAccessor],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dateInput = fixture.debugElement.nativeElement.querySelector('input[type=date]');
    textInput = fixture.debugElement.nativeElement.querySelector('input[type=text]');
  });

  it('should initialize with null date', () => {
    expect(component.date).toBeUndefined();
    expect(component.textDate).toBeUndefined();

    expect(dateInput.value).toBe('');
    expect(textInput.value).toBe('');
  });

  it('should update ngModel when user enters a valid date', () => {
    dateInput.value = '2025-01-01';
    dateInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.date).toEqual(new Date(2025, 0, 1));

    textInput.value = '01/01/2026';
    textInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.textDate).toEqual(new Date(2026, 0, 1));
  });

  it('should update input field when ngModel changes', async () => {
    component.date = new Date(2025, 0, 1);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(dateInput.value).toBe('2025-01-01');

    component.date = undefined;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(dateInput.value).toBe(''); 

    component.textDate = new Date(2026, 0, 1);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(textInput.value).toBe('01/01/2026');

    component.textDate = undefined;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(textInput.value).toBe('');
  });

  it('should set ngModel to null when input is cleared', async () => {
    component.date = new Date(2025, 0, 1);
    component.textDate = new Date(2026, 0, 1);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dateInput.value).toBe('2025-01-01');
    expect(textInput.value).toBe('01/01/2026');

    dateInput.value = '';
    dateInput.dispatchEvent(new Event('input'));
    textInput.value = '';
    textInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.date).toBeUndefined();
    expect(component.textDate).toBeUndefined();

    textInput.value = '01/01';
    textInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.textDate).toBeUndefined();
  });
});
