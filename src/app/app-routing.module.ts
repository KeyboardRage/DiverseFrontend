import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { DashboardComponent } from "./admin-panel/dashboard/dashboard.component";
import { TicketsComponent } from "./admin-panel/tickets/tickets.component";
import { IndexComponent } from "./admin-panel/index.component";
import { BansComponent } from "./admin-panel/bans/bans.component";
import { CasesComponent } from "./admin-panel/cases/cases.component";
import { ArchiveComponent } from "./admin-panel/archive/archive.component";
import { LoginComponent } from "./admin-panel/login/login.component";
import { NewCaseComponent } from "./admin-panel/cases/new-case/new-case.component";
import { CaseComponent } from "./admin-panel/case/case.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { Error404Component } from "./admin-panel/error404/error404.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "errors/:error", component: Error404Component },
  {
    path: "admin",
    component: IndexComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "tickets",
        component: TicketsComponent
      },
      {
        path: "bans",
        component: BansComponent
      },
      {
        path: "cases",
        component: CasesComponent
      },
      { path: "cases/:id", component: CaseComponent },
      {
        path: "new-case",
        component: NewCaseComponent
      },
      { path: "archive", component: ArchiveComponent },
      { path: "**", component: DashboardComponent }, // Error 404 on Admin
      { path: "**", redirectTo: "admin" }
    ]
  },
  { path: "**", component: LandingComponent }, // Error 404
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
