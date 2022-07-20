import { Annotate, boolean, BooleanType, date, equals, length, pattern, required, string, StringType, StringType2 } from '@muziehdesign/forms';

export class CheckoutModel {
  @Annotate(string().required().pattern(/d{9}$/i))
  instructions?: string;

  @Annotate(boolean().required().equals(true))
  consented?: boolean = false;

  items?: ItemModel[];

  @Annotate(
    date()
      .required()
      .test(
        'minimumAge',
        (d: Date) => {
          return Number(+new Date().getFullYear() - +new Date(`${d}`).getFullYear()) >= 18;
        },
        'some error message'
      )
      .min(new Date('1900-01-01'), 'Please enter a valid date. Minimum date is 01/01/1900')
  )
  date?: string;
}

export class ItemModel {
  itemId?: number;

  quantity?: number;
}
