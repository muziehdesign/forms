import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {IMaskFactory, IMaskModule} from 'angular-imask';
import { FormsModule as MuziehFormsModule } from '@muziehdesign/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MailingAddressComponent } from './mailing-address/mailing-address.component';
import { MaskFactoryService } from 'src/core/mask-factory.service';

@NgModule({
  declarations: [
    AppComponent,
    MailingAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    IMaskModule,
    MuziehFormsModule
  ],
  providers: [
    {
      provide: IMaskFactory,
      useClass: MaskFactoryService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
