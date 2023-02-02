import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantComponent } from './examples/applicant/applicant.component';

const routes: Routes = [
  { path: 'examples/applicant', component: ApplicantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
