import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as Yup from 'yup';
import { YUP_LOCALE_KEYS } from '@muziehdesign/forms';

if (environment.production) {
    enableProdMode();
}

Yup.setLocale(YUP_LOCALE_KEYS);

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
