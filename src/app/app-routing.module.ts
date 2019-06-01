import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { animation: "DashboardPage" }
  },
  {
    path: "application-detail",
    component: ApplicationDetailComponent,
    data: { animation: "DetailPage" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
