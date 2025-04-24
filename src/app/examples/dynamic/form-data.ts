import { BooleanSchema, ConstraintAnnotations, FieldSchema, FieldSchemaType, StringSchema, StringTypeAnnotations } from "@muziehdesign/forms";

export const DYNAMIC_FIELDS = [
    {
        name: 'String',
        type: FieldSchemaType.string,
        constraints: {
            required: {
                required: true
            },
            minLength: {
                minLength: 5
            }
        } satisfies StringTypeAnnotations
    } satisfies StringSchema, 
    {
        name: 'Boolean',
        type: FieldSchemaType.boolean,
        constraints: {
            
        }
    } satisfies BooleanSchema,
    {
        name: 'AnotherString',
        type: FieldSchemaType.string,
        constraints: {
            required: {
                required: true
            },
            minLength: {
                minLength: 5
            }
        } satisfies StringTypeAnnotations
    } satisfies StringSchema, 

] satisfies FieldSchema<ConstraintAnnotations>[];