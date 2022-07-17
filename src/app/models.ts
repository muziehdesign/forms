import { BooleanType, equals, length, required, StringType } from "@muziehdesign/forms";

export class CheckoutModel {

  @StringType(required(), length(5))
  instructions?: string;

  @BooleanType(required(), equals(true))
  consented?: boolean = false;

  items?: ItemModel[];
}

export class ItemModel {

  itemId?: number;

  quantity?: number;
}
