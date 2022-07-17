import { length, required, StringType } from "@muziehdesign/forms";

export class CheckoutModel {

  @StringType(required(), length(5))
  instructions?: string;

  consented?: boolean;

  items?: ItemModel[];
}

export class ItemModel {

  itemId?: number;

  quantity?: number;
}
