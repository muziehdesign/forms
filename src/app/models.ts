import { Annotate, boolean, BooleanType, equals, length, pattern, required, string, StringType, StringType2 } from "@muziehdesign/forms";

export class CheckoutModel {

  @StringType(required(), length(5), pattern(/ab+c/i))
  //@Annotate(string().required().pattern(/d{9}$/i))
  instructions?: string;

  @Annotate(boolean().required().equals(true))
  consented?: boolean = false;

  items?: ItemModel[];
}

export class ItemModel {

  itemId?: number;

  quantity?: number;
}
