import { ConstraintAnnotations, ConstraintType, FieldSchema, FieldSchemaType, StringTypeAnnotations } from "@muziehdesign/forms";

export const DYNAMIC_FIELDS = [
    {
        name: 'String',
        type: FieldSchemaType.string,
        label: 'String field',
        constraints: {
            constraintType: ConstraintType.string,
        } satisfies StringTypeAnnotations
    }
] satisfies FieldSchema<ConstraintAnnotations>[];