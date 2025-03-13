import { NumberType, StringType, max, maxLength, min, minLength, pattern, required, length, ArrayType, DateType, BooleanType, equals, FileType, ObjectType } from "../type-annotations";

export class StringTestModel {
    @StringType()
    optionalEntry?: string;
  
    @StringType(required())
    requiredEntry?: string;
  
    @StringType(minLength(5))
    minLengthEntry?: string;
  
    @StringType(maxLength(10))
    maxLengthEntry?: string;

    @StringType(pattern(/muziehd(e+)sign/g))
    patternEntry?: string;

    @StringType(length(5))
    lengthEntry?: string;
  }
  
  export class NumberTestModel {
    @NumberType()
    optionalEntry?: number;

    @NumberType(required())
    requiredEntry?: number;

    @NumberType(min(5))
    minEntry?: number;

    @NumberType(max(10))
    maxEntry?: number;
  }

  export class ArrayTestModel {
    @ArrayType()
    optionalEntry?: string[];

    @ArrayType(min(5))
    minEntry?: string[];

    @ArrayType(max(10))
    maxEntry?: string[];
  }

  export class DateTestModel {
    @DateType()
    optionalEntry?: Date;

    @DateType(required())
    requiredEntry?: Date;

    @DateType(min(new Date(2000, 0, 5)))
    minEntry?: Date;

    @DateType(max(new Date(2000, 0, 10)))
    maxEntry?: Date;
  }

  export class BooleanTestModel {
    @BooleanType()
    optionalEntry?: boolean;

    @BooleanType(required())
    requiredEntry?: boolean;

    @BooleanType(equals(true))
    equalsEntry?: boolean;
  }

  export class FileTestModel {
    @FileType()
    optionalEntry?: File;

    @FileType(required())
    requiredEntry?: File;
  }

  export class NestedObjectModel {
    @ObjectType(StringTestModel)
    optionalEntry?: StringTestModel;

    @ObjectType(StringTestModel, required())
    requiredEntry?: StringTestModel;
  }