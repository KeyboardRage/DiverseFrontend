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

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "login", component: LoginComponent },
  {
    path: "admin",
    component: IndexComponent,
    children: [
      { path: "", component: DashboardComponent, pathMatch: "full" },
      { path: "tickets", component: TicketsComponent, pathMatch: "full" },
      { path: "bans", component: BansComponent, pathMatch: "full" },
      { path: "cases", component: CasesComponent, pathMatch: "full" },
      {
        path: "new-case",
        component: NewCaseComponent,
        pathMatch: "full"
      },
      { path: "archive", component: ArchiveComponent, pathMatch: "full" },
      { path: "**", component: DashboardComponent }, // Error 404 on Admin
      { path: "**", redirectTo: "admin", pathMatch: "full" }
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
