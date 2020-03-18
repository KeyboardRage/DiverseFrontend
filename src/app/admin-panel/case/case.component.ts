import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CasesService } from "../../services/cases.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-case",
  templateUrl: "./case.component.html",
  styleUrls: ["./case.component.scss"]
})
export class CaseComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private casesService: CasesService
  ) {
    this.caseID = activatedRoute.snapshot.params["id"];
  }
  caseID: number;
  cases$: any;
  ngOnInit(): void {
    this.cases$ = this.casesService
      .getCase(this.caseID)
      .pipe(map((data: any) => data.data));
  }
}
