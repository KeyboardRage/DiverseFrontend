import { Component, OnInit } from "@angular/core";
import { CasesService } from "../../services/cases.service";
import { map } from "rxjs/operators";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private casesService: CasesService) {}

  cases$: any;
  ngOnInit(): void {
    this.cases$ = this.casesService
      .getCases()
      .pipe(map((data: any) => data.data));
  }
}
