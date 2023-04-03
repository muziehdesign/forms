import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {IMaskFactory, IMaskModule} from 'angular-imask';
import { FormsModule as MuziehFormsModule } from '@muziehdesign/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MailingAddressComponent } from './mailing-address/mailing-address.component';
import { MaskFactoryService } from 'src/core/mask-factory.service';
import { ApplicantComponent } from './examples/applicant/applicant.component';
import { StringComponent } from './examples/string/string.component';
import { HomeComponent } from './home/home.component';
import { NumberComponent } from './examples/number/number.component';
import { DateComponent } from './examples/date/date.component';
import { BooleanComponent } from './examples/boolean/boolean.component';
import { ObjectComponent } from './examples/object/object.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicantComponent,
    MailingAddressComponent,
    StringComponent,
    HomeComponent,
    NumberComponent,
    DateComponent,
    BooleanComponent,
    ObjectComponent
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
