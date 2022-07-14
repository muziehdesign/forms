import { StringSchema, BooleanSchema, Required, Equals } from '@muziehdesign/forms';

export class CheckoutModel {
  @Required({errorMessage: 'alala'})
  instructions?: string;

  @Equals(true)
  consented?: boolean;
}
