import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./landing/landing.component";
import { NavbarComponent } from "./landing/components/navbar/navbar.component";
import { DashboardComponent } from "./admin-panel/dashboard/dashboard.component";
import { TopnavComponent } from "./admin-panel/components/topnav/topnav.component";
import { SidenavComponent } from "./admin-panel/components/sidenav/sidenav.component";
import { TicketsComponent } from "./admin-panel/tickets/tickets.component";
import { LoginComponent } from "./admin-panel/login/login.component";
import { BansComponent } from "./admin-panel/bans/bans.component";
import { CasesComponent } from "./admin-panel/cases/cases.component";
import { ArchiveComponent } from "./admin-panel/archive/archive.component";
import { IndexComponent } from "./admin-panel/index.component";
import { NewCaseComponent } from "./admin-panel/cases/new-case/new-case.component";
import { FormsModule } from "@angular/forms";
import { CaseComponent } from "./admin-panel/case/case.component";
import { BitwisePipe } from "./pipes/bitwise.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { CookieService } from "ngx-cookie-service";
import { TableComponent } from "./admin-panel/components/table/table.component";
import { Error404Component } from "./admin-panel/error404/error404.component";
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    DashboardComponent,
    TopnavComponent,
    SidenavComponent,
    TicketsComponent,
    LoginComponent,
    BansComponent,
    CasesComponent,
    ArchiveComponent,
    IndexComponent,
    NewCaseComponent,
    CaseComponent,
    BitwisePipe,
    FilterPipe,
    TableComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxDropzoneModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
