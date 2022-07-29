import { DateType, maxLength, min, NumberType, pattern, required, StringType, test } from '@muziehdesign/forms';

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
}

export class ItemModel {
  itemId?: number;

  quantity?: number;
}
