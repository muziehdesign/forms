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
