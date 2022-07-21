import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule as MuziehFormsModule } from '@muziehdesign/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MuziehFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
