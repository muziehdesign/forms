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

        // regex to match MM/dd/yyyy

      const parsed = parse(str, 'MM/dd/yyyy', new Date());
      if (isValid(parsed)) {
        return parsed;
      }
      return undefined;
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