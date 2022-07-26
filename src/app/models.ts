import { Annotate, boolean, BooleanType, date, DateType, equals, length, maxLength, min, pattern, required, string, StringType, StringType2, test } from '@muziehdesign/forms';

export class CheckoutModel {
  //@Annotate(string().required().pattern(/d{9}$/i))
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
}

export class ItemModel {
  itemId?: number;

  quantity?: number;
}
