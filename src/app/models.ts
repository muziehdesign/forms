import { DateType, maxLength, min, ObjectType, NumberType, pattern, required, StringType, test, length, max, BooleanType, equals } from '@muziehdesign/forms';

export class PhoneNumberModel {
  @StringType(required())
  number?: string;
  @StringType()
  extension?: string;
}

export class ApplicantModel {
  @StringType(required())
  name?: string;

  @ObjectType(PhoneNumberModel)
  phoneNumber?: PhoneNumberModel;

  @ObjectType(PhoneNumberModel)
  workPhoneNumber?: PhoneNumberModel;
}

export class AddressModel {
  @StringType(required())
  street1?: string;
  street2?: string;
  @StringType(required())
  city?: string;
  @StringType(required())
  state?: string;
  @StringType(required())
  zipCode?: string;
}

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

export class ItemModel {
  itemId?: number;
  quantity?: number;
}

