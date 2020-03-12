import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './admin-panel/login/login.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'admin', component: DashboardComponent,
    children: [
      { path: '**', component: DashboardComponent }, // Error 404 on Admin
      { path: '**', redirectTo: 'admin', pathMatch: 'full' },
    ]
  },
  { path: '**', component: LandingComponent }, // Error 404
  { path: '**', redirectTo: '', pathMatch: 'full' }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }