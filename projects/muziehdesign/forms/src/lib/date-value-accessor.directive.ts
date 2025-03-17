import { formatDate } from '@angular/common';
import { Directive, ElementRef, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[mzDate]',
  standalone: true,
  host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateValueAccessor),
      multi: true,
    },
  ],
})
export class DateValueAccessor implements ControlValueAccessor {
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

  writeValue(obj?: Date): void {
    let normalizedValue = '';
    if (!obj) {
      normalizedValue = '';
    } else if (this._elementRef.nativeElement.type === 'date') {
      normalizedValue = obj.toISOString().split('T')[0];
    } else {
      normalizedValue = obj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }); // TODO: support other date formats
    }
    this.setProperty('value', normalizedValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = (value) => {
      const parsed = this.parseDate(value);
      fn(parsed);
    };
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.setProperty('disabled', isDisabled);
  }
  protected setProperty(key: string, value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, key, value);
  }

  private parseDate(value: string): Date | undefined {
    const validFormat = /^(\d{1,2}\/\d{1,2}\/\d{4})$/.test(value) || /^(\d{4}-\d{2}-\d{2})$/.test(value);
    if (!validFormat) {
      return undefined;
    }

    const entry = new Date(value).toISOString().split('T')[0];

    /* For ISO Strings without time the day, month and year must be extracted from the ISO String
      before Date creation to avoid time offset and errors in the new Date.
      If we only replace '-' with ',' in the ISO String ("2015,01,01"), and try to create a new
      date, some browsers (e.g. IE 9) will throw an invalid Date error.
      If we leave the '-' ("2015-01-01") and try to create a new Date("2015-01-01") the timeoffset
      is applied.
      Note: ISO months are 0 for January, 1 for February, ... */
    const [y, m = 1, d = 1] = entry.split('-').map((val: string) => +val);
    return this.createDate(y, m - 1, d);
  }

  private createDate(year: number, month: number, date: number): Date {
    // The `newDate` is set to midnight (UTC) on January 1st 1970.
    // - In PST this will be December 31st 1969 at 4pm.
    // - In GMT this will be January 1st 1970 at 1am.
    // Note that they even have different years, dates and months!
    const newDate = new Date(0);

    // `setFullYear()` allows years like 0001 to be set correctly. This function does not
    // change the internal time of the date.
    // Consider calling `setFullYear(2019, 8, 20)` (September 20, 2019).
    // - In PST this will now be September 20, 2019 at 4pm
    // - In GMT this will now be September 20, 2019 at 1am

    newDate.setFullYear(year, month, date);
    // We want the final date to be at local midnight, so we reset the time.
    // - In PST this will now be September 20, 2019 at 12am
    // - In GMT this will now be September 20, 2019 at 12am
    newDate.setHours(0, 0, 0);

    return newDate;
  }
}
