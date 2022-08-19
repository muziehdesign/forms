import { Injectable } from '@angular/core';
import { IMaskFactory } from 'angular-imask';
import IMask from 'imask';
import { format, parse } from 'date-fns'

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

        if (opts.mask === 'date') {
            const dateOpts = {
                mask: Date,
                pattern: 'MM/DD/YYYY',
                format: (date: Date): string => format(date, 'MM/dd/yyyy'),
                parse: (str: string) : Date | undefined => {
                    try{
                        console.log('parsing ' + str);
                        const d = parse(str, 'MM/dd/yyyy', new Date());
                        console.log('parsed:', d);
                        return d;
                    } catch(e) {
                        console.log(e);
                        return undefined;
                    }
                },
                blocks: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    MM: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12,
                    },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    DD: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 31,
                    },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    YYYY: {
                        mask: IMask.MaskedRange,
                        from: -9999,
                        to: 9999,
                    },
                },
            };
            const finalOptions = Object.assign({}, dateOpts, opts);
            finalOptions.mask = Date;
            return IMask(el, finalOptions);
        }
        return IMask(el, opts);
    }
}
