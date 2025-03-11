import { DynamicFormModel, FieldType } from "src/app/dynamic/models";

export const FORM_DATA = {
    title: 'Dynamic Form',
    sections: [
        {
            sectionId: 1,
            label: '',
            fields: [
                {
                    fieldId: '1',
                    label: 'Username',
                    type: FieldType.Text,
                    required: true,
                    name: 'field1'
                },
                {
                    fieldId: '2',
                    label: 'Age',
                    type: FieldType.Number,
                    required: true,
                    name: 'field2'
                },
                {
                    fieldId: '3',
                    label: 'acceptAgreement',
                    type: FieldType.Checkbox,
                    required: true,
                    name: 'field3'
                }
            ]
        }
    ]
} satisfies DynamicFormModel;