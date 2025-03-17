import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {IMaskFactory, IMaskModule} from 'angular-imask';
import { FormsModule as MuziehFormsModule, MzFormsModule } from '@muziehdesign/forms';

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
import { SharedModule } from './shared/shared.module';
import { FileComponent } from './examples/file/file.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicantComponent,
    MailingAddressComponent,
    HomeComponent,
    NumberComponent,
    BooleanComponent,
    ObjectComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    IMaskModule,
    MuziehFormsModule,
    SharedModule,

    StringComponent,
    DateComponent,
    NavbarComponent,
    MzFormsModule
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
