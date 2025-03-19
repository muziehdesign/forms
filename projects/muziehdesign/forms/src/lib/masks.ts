import { format, isValid, parse } from 'date-fns';
import * as IMask from 'imask';

export const phoneNumberOptions = {
  mask: '(000) 000-0000',
};

export const ssnOptions = {
  mask: '000-00-0000',
};

export const currencyOptions = {
  mask: Number,
  scale: 2,
  thousandsSeparator: ',',
  padFractionalZeros: true,
  radix: '.',
  mapToRadix: ['.'],
};

export const integerOptions = {
  mask: Number,
  scale: 0,
  thousandsSeparator: ',',
  padFractionalZeros: true,
  radix: '.',
  mapToRadix: ['.'],
};

