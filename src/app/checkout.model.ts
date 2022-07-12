import { StringSchema, BooleanSchema } from '@muziehdesign/modelvalidation';

export class CheckoutModel {
  @StringSchema({ required: true })
  instructions?: string;

  @BooleanSchema({ equals: true })
  consented: boolean = false;
}
