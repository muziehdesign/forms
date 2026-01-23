import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormMessageService, FormsModule as MuziehFormsModule, MzFormsModule } from '@muziehdesign/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import * as validations from './../i18n/validation-messages.json';

@NgModule({
  declarations: [
    AppComponent,
    ApplicantComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MuziehFormsModule,
    SharedModule,

    StringComponent,
    NumberComponent,
    ObjectComponent,
    DateComponent,
    BooleanComponent,
    NavbarComponent,
    MzFormsModule,
    HomeComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAppInitializer(()=>{
        const message = inject(FormMessageService);
        message.registerLocaleMessages(validations, 'en');
    })
  ]
})
export class AppModule { }
