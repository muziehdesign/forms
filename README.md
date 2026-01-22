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

Create locale message files for each supported language. The structure supports three levels of specificity:

```typescript
// en.messages.ts
export const EN_MESSAGES = {
  // Global validation messages (used if no namespace/field-specific message found)
  mixed: {
    required: 'This field is required',
    notType: 'Invalid value type'
  },
  string: {
    min: 'Must be at least ${min} characters',
    max: 'Must be no more than ${max} characters',
    email: 'Must be a valid email address'
  },
  date: {
    min: 'Date must be after ${min}',
    max: 'Date must be before ${max}'
  },
  
  // Namespaced messages (specific to a form model)
  // Use the name from @Model('CheckoutForm')
  CheckoutForm: {
    // Field-specific messages
    instructions: {
      'string.max': 'Instructions are too long (max 9 characters)'
    },
    date: {
      'date.min': 'Birth date cannot be before 1900'
    }
  }
};
```

#### 3. Register Messages in Your App

In your `AppComponent` or application initializer:

```typescript
import { Component, LOCALE_ID, Inject } from '@angular/core';
import { FormMessageService } from '@muziehdesign/forms';
import { EN_MESSAGES } from './locales/en.messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private messageService: FormMessageService,
    @Inject(LOCALE_ID) private localeId: string
  ) {
    // Register messages for the current locale
    this.messageService.registerFormMessages(EN_MESSAGES, this.localeId);
  }
}
```

### Message Resolution Priority

When displaying an error, the library searches for messages in this order:

1. **Field-specific namespaced message**: `messages[modelName][fieldName][errorKey]`
2. **Global message**: `messages[errorKey]`
3. **Fallback**: Returns the error key itself (e.g., `'mixed.required'`)

**Example:**
```typescript
@Model('CheckoutForm')
export class CheckoutModel {
  @StringType(required(), maxLength(50))
  instructions?: string;
}
```

For a `max` error on the `instructions` field:
1. First tries: `messages.CheckoutForm.instructions['string.max']`
2. Then tries: `messages.string.max`
3. Fallback: `'string.max'`

### Multi-language Support

Support multiple languages by registering messages for each locale:

```typescript
// app.component.ts
import { EN_MESSAGES } from './locales/en.messages';
import { ES_MESSAGES } from './locales/es.messages';

constructor(
  private messageService: FormMessageService,
  @Inject(LOCALE_ID) private localeId: string
) {
  this.messageService.registerFormMessages(EN_MESSAGES, 'en');
  this.messageService.registerFormMessages(ES_MESSAGES, 'es');
  // Messages for current LOCALE_ID will be used automatically
}
```

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

**Note:** Custom messages in decorators take precedence over localized messages.

### Available Message Keys

**Mixed (all types):**
- `mixed.required`
- `mixed.notType`
- `mixed.oneOf`
- `mixed.notOneOf`
- `mixed.defined`

**String:**
- `string.min` - Has `${min}` parameter
- `string.max` - Has `${max}` parameter
- `string.length` - Has `${length}` parameter
- `string.matches`
- `string.email`
- `string.url`

**Number:**
- `number.min` - Has `${min}` parameter
- `number.max` - Has `${max}` parameter
- `number.lessThan`
- `number.moreThan`
- `number.positive`
- `number.negative`
- `number.integer`

**Date:**
- `date.min` - Has `${min}` parameter
- `date.max` - Has `${max}` parameter

**Array:**
- `array.min` - Has `${min}` parameter
- `array.max` - Has `${max}` parameter
- `array.length` - Has `${length}` parameter

**Boolean:**
- `boolean.isValue`


## Next version
### Breaking changes
- ModelValidator is being renamed to ModelSchema
