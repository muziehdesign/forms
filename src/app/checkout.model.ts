import { StringSchema, BooleanSchema, Required, Equals } from '@muziehdesign/forms';

export class CheckoutModel {
  //@StringSchema({ required: true })
  @Required({errorMessage: 'alala'})
  instructions?: string;

  @Equals(true)
  consented?: boolean;
}
