import { Injectable } from '@angular/core';
import { IMaskFactory } from 'angular-imask';
import IMask from 'imask';
import { currencyOptions, dateMaskOptions, phoneNumberOptions } from '@muziehdesign/forms';

@Injectable({
  providedIn: 'root',
})
export class MaskFactoryService extends IMaskFactory {
  create<Opts extends IMask.AnyMaskedOptions>(el: IMask.MaskElement | HTMLElement, opts: Opts): IMask.InputMask<Opts> {
    if (opts.mask === 'phone') {
      const finalOptions = Object.assign({}, phoneNumberOptions, opts);
      finalOptions.mask = '(000) 000-0000';
      return IMask(el, finalOptions);
    }

    if (opts.mask === 'currency') {
      const finalOptions = Object.assign({}, currencyOptions, opts);
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
      const finalOptions = Object.assign({}, dateMaskOptions, opts, {mask: 'MM/dd/yyyy'});
      return IMask(el, finalOptions);
    }

    return IMask(el, opts);
  }
}
