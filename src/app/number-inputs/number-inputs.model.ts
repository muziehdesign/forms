import { NumberType, required } from "@muziehdesign/forms";

export class NumberInputsModel {
    
    @NumberType(required())
    requiredNumber?: number;

    @NumberType()
    nullableNumber?: number;
}