import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooleanComponent } from './examples/boolean/boolean.component';
import { ApplicantComponent } from './examples/applicant/applicant.component';
import { DateComponent } from './examples/date/date.component';
import { NumberComponent } from './examples/number/number.component';
import { StringComponent } from './examples/string/string.component';
import { ObjectComponent } from './examples/object/object.component';

const routes: Routes = [
  { path: '',  redirectTo: 'examples/string', pathMatch: 'full' },
  { path: 'examples/applicant', component: ApplicantComponent},
  { path: 'examples/string', component: StringComponent },
  { path: 'examples/number', component: NumberComponent },
  { path: 'examples/date', component: DateComponent },
  { path: 'examples/boolean', component: BooleanComponent },
  { path: 'examples/object', component: ObjectComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
