import { max, min, NumberType, required } from '@muziehdesign/forms';

export class NumberExampleModel {
  @NumberType(required('Required field'), min(1), max(1000))
  requiredNumber?: number;
  @NumberType(min(1), max(1000))
  optionalNumber?: number;
}
