```typescript
export class CheckoutModel {
  @StringType(
    required(),
    pattern(/\d{9}$/i, 'Must have 9 numbers'),
    maxLength(9)
  )
  instructions?: string;

  items?: ItemModel[];

  @DateType(
    required(),
    test(
        'minimumAge',
        (d: Date) => {
          return Number(+new Date().getFullYear() - +d?.getFullYear()) >= 18;
        },
        'You must be over 18'
    ),
    min(new Date(1900, 0, 1), 'Minimum date is 01/01/1900')
  )
  date?: Date;

  @NumberType(
    required()
  )
  totalCost?: number;
  @ObjectType(AddressModel, required())
  address?: AddressModel;

  @ObjectType(AddressModel)
  optionalAddress?: AddressModel;
}
```

```html
<form #checkoutForm="ngForm" (ngSubmit)="checkout()">
  <div>
    {{checkoutForm.errors | json}}
  </div>
  <label class="block p-8 my-2 bg-slate-100">
    <span>Instructions</span>
    <input type="text" [(ngModel)]="model.instructions" name="instructions" #instructionsField="ngModel" />
    <span>{{instructionsField.errors | json}}</span>
    <mz-field-errors [field]="instructionsField" *ngIf="instructionsField.touched && instructionsField.invalid"></mz-field-errors>
  </label>
  <br/>
  <label class="block p-8 my-2 bg-slate-100">
    <span>Date of birth</span>
    <input type="text" [(ngModel)]="model.date" name="date" #dateField="ngModel" />
    <span>{{dateField.errors | json}}</span>
    <mz-field-errors [field]="dateField" *ngIf="dateField.touched && dateField.invalid"></mz-field-errors>
  </label>
  <label class="block p-8">
    <span>Total cost</span>
    <input type="text" [(ngModel)]="model.totalCost" name="totalCost" #totalCost="ngModel" />
    <span>{{totalCost.errors | json}}</span>
    <mz-field-errors [field]="totalCost" *ngIf="totalCost.touched && totalCost.invalid"></mz-field-errors>
  </label>

  <fieldset ngModelGroup="address">
    <legend>Mailing address</legend>
    <app-mailing-address [model]="model.address!"></app-mailing-address>
  </fieldset>


  <button type="submit">Check out</button>
</form>
```

## Localization

The library supports full localization of validation messages with support for:
- **Default global messages** - Shared across all forms
- **Namespaced messages** - Specific to a form model
- **Field-specific messages** - Per field within a model
- **Multiple locales** - Automatically uses Angular's `LOCALE_ID`

Localized message can be retrieved with `MessageService`.

### Setup

#### 1. Configure Yup Locale Keys (Required)

In your `main.ts`, configure Yup to return message keys instead of hardcoded strings:

```typescript
import * as Yup from 'yup';
import { YUP_LOCALE_KEYS } from '@muziehdesign/forms';

Yup.setLocale(YUP_LOCALE_KEYS);
```

This ensures validation errors return keys like `'mixed.required'` instead of hardcoded English messages.

#### 2. Register Locale Messages

Create locale message files for each supported language. See `src/i18n/validations.json` for example.

Then load and register the JSON in your app:

```typescript
import { Component } from '@angular/core';
import { FormMessageService } from '@muziehdesign/forms';
import enValidation from './locales/en/validation.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private messageService: FormMessageService) {
    this.messageService.registerLocaleMessages(enValidation, 'en');
  }
}
```

### Message Resolution Priority

When displaying an error, the library searches for messages in this order: `[model/namespace][fieldName][errorKey]`

**Example:**
```typescript
@Model('CheckoutModel')
export class CheckoutModel {
  @StringType(required(), maxLength(50))
  instructions?: string;
}
```

For a `max` error on the `instructions` field:
1. If custom message if provided, it would be used
1. Otherwise, first tries: `CheckoutModel.instructions.string.max`
1. Then tries: `string.max`
1. Fallback: `'string.max'`


### Custom Error Messages in Decorators

You can also provide custom messages directly in decorators:

```typescript
@DateType(
  required(),
  min(new Date(1900, 0, 1), 'Birth date cannot be before 1900'),
  max(new Date(), 'Birth date cannot be in the future')
)
dateOfBirth?: Date;
```

## Next version
### Breaking changes
- ModelValidator is being renamed to ModelSchema
