import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {IMaskModule} from 'angular-imask';
import { FormsModule as MuziehFormsModule } from '@muziehdesign/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MailingAddressComponent } from './mailing-address/mailing-address.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
