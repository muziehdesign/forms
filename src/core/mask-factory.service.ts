import { Injectable } from '@angular/core';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import IMask from 'imask';
import { format, parse, isValid } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class MaskFactoryService extends IMaskFactory {
  create<Opts extends IMask.AnyMaskedOptions>(el: IMask.MaskElement | HTMLElement, opts: Opts): IMask.InputMask<Opts> {
    if (opts.mask === 'phone') {
      const phoneOpts = {};
      const finalOptions = Object.assign({}, phoneOpts, opts);
      finalOptions.mask = '(000) 000-0000';
      return IMask(el, finalOptions);
    }

    if (opts.mask === 'currency') {
      const currencyOpts = {};
      const finalOptions = Object.assign({}, currencyOpts, opts);
      finalOptions.mask = [
        { mask: '' },
        {
          mask: 'num',
          lazy: false,
          blocks: {
            num: {
              mask: Number,
              scale: 2,
              thousandsSeparator: ',',
              padFractionalZeros: true,
              radix: '.',
              mapToRadix: ['.'],
            },
          },
        },
      ];
      return IMask(el, finalOptions);
    }

    if (opts.mask === 'MM/dd/yyyy') {
      const dateOpts = {
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
      const finalOptions = Object.assign({}, dateOpts, opts);
      finalOptions.mask = 'MM/dd/yyyy';
      return IMask(el, finalOptions);
    }

    return IMask(el, opts);
  }
}
