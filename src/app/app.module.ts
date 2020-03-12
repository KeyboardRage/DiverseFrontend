import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './landing/components/navbar/navbar.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { LoginComponent } from './admin-panel/login/login.component';
import { TopnavComponent } from './admin-panel/components/topnav/topnav.component';
import { SidenavComponent } from './admin-panel/components/sidenav/sidenav.component';
import { TicketsComponent } from './admin-panel/tickets/tickets.component';
import { IndexComponent } from './admin-panel/index.component';
import { BansComponent } from './admin-panel/bans/bans.component';
import { CasesComponent } from './admin-panel/cases/cases.component';
import { ArchiveComponent } from './admin-panel/archive/archive.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    TopnavComponent,
    SidenavComponent,
    TicketsComponent,
    IndexComponent,
    BansComponent,
    CasesComponent,
    ArchiveComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
