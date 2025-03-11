export interface FieldModel {
    fieldId: string;
    name: string;
    label: string;
    type: FieldType;
    required: boolean;
    options?: FieldOptionModel[];
}

export enum FieldType {
    Checkbox = 'checkbox',
    Text = 'text',
    Textarea = 'textarea',
    Select = 'select',
    MultiSelect = 'multiselect',
    Number = 'number',
    DateTime = 'datetime'
}

export interface FieldOptionModel {
    optionId: number;
    label: string;
    value: string;
}

export interface FieldValueModel {
    fieldId: number;
    value: string;
}

export interface FieldSectionModel {
    sectionId: number;
    label: string;
    fields: FieldModel[];
}

export interface DynamicFormModel {
    title: string;
    sections: FieldSectionModel[];
}