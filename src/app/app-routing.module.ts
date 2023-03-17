import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateComponent } from './examples/activate/activate.component';
import { ApplicantComponent } from './examples/applicant/applicant.component';
import { CalendarComponent } from './examples/calendar/calendar.component';
import { OrderComponent } from './examples/order/order.component';
import { TicketComponent } from './examples/ticket/ticket.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'examples/applicant', component: ApplicantComponent },
  { path: 'examples/ticket', component: TicketComponent },
  { path: 'examples/order', component: OrderComponent },
  { path: 'examples/calendar', component: CalendarComponent },
  { path: 'examples/activate', component: ActivateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
