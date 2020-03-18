import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CasesService } from "../../services/cases.service";
import { map } from "rxjs/operators";
@Component({
  selector: "app-cases",
  templateUrl: "./cases.component.html",
  styleUrls: ["./cases.component.scss"]
})
export class CasesComponent implements OnInit {
  constructor(private casesService: CasesService) {}
  cases$: any;
  searchText;
  ngOnInit(): void {
    this.cases$ = this.casesService
      .getCases()
      .pipe(map((data: any) => data.data));
  }
}
