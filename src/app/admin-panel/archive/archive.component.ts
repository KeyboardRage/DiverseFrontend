import { Component, OnInit } from "@angular/core";
import { CasesService } from "src/app/services/cases.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-archive",
  templateUrl: "./archive.component.html",
  styleUrls: ["./archive.component.scss"]
})
export class ArchiveComponent implements OnInit {
  constructor(private casesService: CasesService) {}
  cases: any;
  ngOnInit(): void {
    this.cases = this.casesService
      .getCases()
      .pipe(map((data: any) => data.data));
  }
}
