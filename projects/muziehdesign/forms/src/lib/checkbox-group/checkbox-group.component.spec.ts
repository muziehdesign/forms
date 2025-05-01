import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FieldOption, MzCheckboxGroup } from './checkbox-group.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('MzCheckboxGroupComponent', () => {
    let component: MzCheckboxGroup;
    let fixture: ComponentFixture<MzCheckboxGroup>;
    const CHECKBOX_OPTIONS: FieldOption[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [MzCheckboxGroup],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MzCheckboxGroup);
        component = fixture.componentInstance;
        component.options = CHECKBOX_OPTIONS;
        fixture.detectChanges();
    });

    it('should render checkboxes for all options', () => {
        const labels = fixture.debugElement.queryAll(By.css('label'));
        expect(labels.length).toBe(3);

        labels.forEach((label, index) => {
            expect(label.nativeElement.textContent.trim()).toBe(CHECKBOX_OPTIONS[index].label);
            const checkbox = label.query(By.css('input[type="checkbox"]'));
            expect(checkbox.nativeElement.value).toEqual(CHECKBOX_OPTIONS[index].value);
        });
    });

    it('should update selections when checkboxes are checked', () => {
        const checkboxes = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'));

        // Simulate user checking "Apple" and "Cherry"
        checkboxes[0].nativeElement.checked = true;
        checkboxes[0].nativeElement.dispatchEvent(new Event('change'));

        checkboxes[2].nativeElement.checked = true;
        checkboxes[2].nativeElement.dispatchEvent(new Event('change'));

        fixture.detectChanges();
        expect(component.selections.length).toEqual(2);
        expect(component.selections.includes('apple')).toBeTrue();
        expect(component.selections.includes('cherry')).toBeTrue();
    });

    it('should reflect changes in checkboxes when selections is updated programmatically', () => {
        component.selections = ['banana'];
        fixture.detectChanges();

        const checkboxes = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'));
        expect(checkboxes[1].nativeElement.checked).toBeTrue(); // "Banana" should be checked
        expect(checkboxes[0].nativeElement.checked).toBeFalse(); // "Apple" should be unchecked
        expect(checkboxes[2].nativeElement.checked).toBeFalse(); // "Cherry" should be unchecked
    });

    it('should implement ControlValueAccessor correctly', () => {
        const mockOnChange = jasmine.createSpy('onChange');
        const mockOnTouched = jasmine.createSpy('onTouched');

        component.registerOnChange(mockOnChange);
        component.registerOnTouched(mockOnTouched);

        component.writeValue(['apple']); // Simulate form control setting value
        fixture.detectChanges();

        expect(component.selections).toEqual(['apple']);
        expect(mockOnChange).not.toHaveBeenCalled(); // onChange should not be triggered by writeValue

        // Simulate user interaction
        const checkboxes = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'));
        checkboxes[1].nativeElement.checked = true;
        checkboxes[1].nativeElement.dispatchEvent(new Event('change'));

        fixture.detectChanges();
        expect(mockOnChange).toHaveBeenCalledWith(['apple', 'banana']); // onChange should be called
    });
});

// Host component to test integration
@Component({
    template: `
        <form #testForm="ngForm">
            <mz-checkbox-group [(ngModel)]="selectedItems" name="fruits" [options]="options"></mz-checkbox-group>
        </form>
        <p data-testid="selected-items">{{ selectedItems | json }}</p>
    `,
    standalone: false
})
class TestHostComponent {
    selectedItems: string[] = [];
    options: FieldOption[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
    ];
}