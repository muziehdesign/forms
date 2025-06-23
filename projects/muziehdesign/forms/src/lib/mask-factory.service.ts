import { Injectable } from '@angular/core';
import { phoneNumberOptions } from '@muziehdesign/forms';

@Injectable({ providedIn: 'root' })
export class MaskFactoryService {
    getMask(name: string) {
        if (name === 'phone') {
            return phoneNumberOptions;
        } 
        return null;
    }
}
