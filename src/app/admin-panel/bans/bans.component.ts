import { Component, OnInit } from "@angular/core";
import { CasesService } from "src/app/services/cases.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-bans",
  templateUrl: "./bans.component.html",
  styleUrls: ["./bans.component.scss"]
})
export class BansComponent implements OnInit {
  constructor(private casesService: CasesService) {}
  cases: any;
  ngOnInit(): void {
    this.cases = this.casesService
      .getCases()
      .pipe(map((data: any) => data.data));
  }
}
