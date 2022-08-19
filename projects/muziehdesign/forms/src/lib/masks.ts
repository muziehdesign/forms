import { format, isValid, parse } from "date-fns";
import * as IMask from "imask";

export const dateMaskOptions =  {
    mask: 'MM/dd/yyyy',
    format: (date: Date | undefined): string => {
      if (!date) {
        return '';
      }
      return format(date, 'MM/dd/yyyy');
    },
    parse: (str: string): Date | undefined => {
      const dateRegex = /(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/([12]\d{3})/;
      if (!str.match(dateRegex)) {
        return undefined;
      }
      return parse(str, 'MM/dd/yyyy', new Date());
    },
    blocks: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      dd: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      yyyy: {
        mask: IMask.MaskedRange,
        from: 1000,
        to: 9999,
      }
    },
  };

  export const phoneNumberOptions = {}

  export const currencyOptions = {};