import { Component, OnInit } from "@angular/core";
import { CasesService } from "src/app/services/cases.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-cases",
  templateUrl: "./cases.component.html",
  styleUrls: ["./cases.component.scss"]
})
export class CasesComponent {
  constructor(private casesService: CasesService) {}
  cases: any;
  // @Input() method: string = "getCases()";
  ngOnInit(): void {
    this.cases = this.casesService
      .getCases()
      .pipe(map((data: any) => data.data));
  }
}
