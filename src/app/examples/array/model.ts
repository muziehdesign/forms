import { ArrayType } from "@muziehdesign/forms";

export class ArrayExampleModel {
    @ArrayType()
    numbers: number[] = [];
}