import { LocaleObject } from 'yup/lib/locale';
import { MessageParams } from 'yup/lib/types';

export const YUP_DEFAULT_LOCALES: LocaleObject = {
    mixed: {
        required: 'Required',
        notType: 'Invalid value',
    },
};

export function getMessage(message: string | {key?: string} & MessageParams, key: string) {
    if(typeof message === 'string') {
        return {key: message}
    }

    return {...message, key: message.key ?? key};
}

export const YUP_LOCALE_KEYS = {
    mixed: {
        required: (params) => getMessage(params, 'mixed.required'),
        notType: (params) => getMessage(params, 'mixed.notType'),
        oneOf: (params) => getMessage(params, 'mixed.oneOf'),
        notOneOf: (params) => getMessage(params, 'mixed.notOneOf'),
        default: (params) => getMessage(params, 'mixed.default'),
        defined: (params) => getMessage(params, 'mixed.defined'),
    },
    string: {
        min: (params) => getMessage(params, 'string.min'),
        max: (params) => getMessage(params, 'string.max'),
        length: (params) => getMessage(params, 'string.length'),
        matches: (params) => getMessage(params, 'string.matches'),
        email: (params) => getMessage(params, 'string.email'),
        url: (params) => getMessage(params, 'string.url'),
        uuid: (params) => getMessage(params, 'string.uuid'),
        trim: (params) => getMessage(params, 'string.trim'),
        lowercase: (params) => getMessage(params, 'string.lowercase'),
        uppercase: (params) => getMessage(params, 'string.uppercase'),
    },
    number: {
        min: (params) => getMessage(params, 'number.min'),
        max: (params) => getMessage(params, 'number.max'),
        lessThan: (params) => getMessage(params, 'number.lessThan'),
        moreThan: (params) => getMessage(params, 'number.moreThan'),
        positive: (params) => getMessage(params, 'number.positive'),
        negative: (params) => getMessage(params, 'number.negative'),
        integer: (params) => getMessage(params, 'number.integer'),
    },
    date: {
        min: (params) => getMessage(params, 'date.min'),
        max: (params) => getMessage(params, 'date.max')
    },
    object: {
        noUnknown: (params) => getMessage(params, 'object.noUnknown'),
    },
    array: {
        min: (params) => getMessage(params, 'array.min'),
        max: (params) => getMessage(params, 'array.max'),
        length: (params) => getMessage(params, 'array.length'),
    },
    boolean: {
        isValue: (params) => getMessage(params, 'boolean.isValue'),
    }
} satisfies LocaleObject;
