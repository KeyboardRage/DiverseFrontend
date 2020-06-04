import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CasesService } from "../../services/cases.service";
import { map } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import * as JWT from "jwt-decode";
import { EventManager } from "@angular/platform-browser";
import { FormCheckService } from "src/app/services/form-check.service";
import { flags } from "src/assets/config";

@Component({
  selector: "app-case",
  templateUrl: "./case.component.html",
  styleUrls: ["./case.component.scss"],
})
export class CaseComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private casesService: CasesService,
    public route: ActivatedRoute,
    public forms: FormCheckService
  ) {
    this.caseID = activatedRoute.snapshot.params["id"];
  }

  caseID: number;
  cases$: any;
  images = [];
  caseData = [];

  getData() {
    this.cases$.toPromise().then((res) => {
      this.caseData = res.data;
      this.images = [];
      res.data.forEach((elem) => {
        if (elem.image) {
          this.images.push(elem.image);
        }
      });
    });
  }
  ngOnInit(): void {
    this.cases$ = this.casesService
      .getCase(this.caseID)
      .pipe(map((data: any) => data.data));
    this.getData();
  }
}
