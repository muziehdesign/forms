import { Injectable } from '@angular/core';
import { IMaskFactory } from 'angular-imask';
import IMask from 'imask';
import { currencyOptions, dateMaskOptions, phoneNumberOptions } from '@muziehdesign/forms';
import { integerOptions, ssnOptions } from 'projects/muziehdesign/forms/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class MaskFactoryService extends IMaskFactory {
  create<Opts extends IMask.AnyMaskedOptions>(el: IMask.MaskElement | HTMLElement, opts: Opts): IMask.InputMask<Opts> {
    if (opts.mask === 'phone') {
      const finalOptions = Object.assign({}, phoneNumberOptions, opts, { mask: phoneNumberOptions.mask });
      return IMask(el, finalOptions);
    }

    if (opts.mask === 'currency') {
      const finalOptions = Object.assign({}, currencyOptions, opts, { mask: currencyOptions.mask });
      return IMask(el, finalOptions);
    }

    if (opts.mask === 'MM/dd/yyyy') {
      const finalOptions = Object.assign({}, dateMaskOptions, opts, { mask: dateMaskOptions.mask });
      return IMask(el, finalOptions);
    }

    if (opts.mask === 'ssn') {
      const finalOptions = Object.assign({}, ssnOptions, opts, { mask: ssnOptions.mask });
      return IMask(el, finalOptions);
    }

    if (opts.mask === 'integer') {
      const finalOptions = Object.assign({}, integerOptions, opts, { mask: integerOptions.mask, thousandsSeparator: ',' });
      return IMask(el, finalOptions);
    }

    return IMask(el, opts);
  }
}
