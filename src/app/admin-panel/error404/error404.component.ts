import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-error404",
  template: `<div class="page-container">
    <div class="center-page">
      <h1>{{ errorNumber }}</h1>
      {{ errorMessage }}
    </div>
  </div>`,
  styleUrls: ["./error404.component.scss"],
})
export class Error404Component implements OnInit {
  @Input() message: string;

  errorNumber: number;
  errorMessage: string;
  errorStrings = {
    400: [
      "Invalid payload",
      "Missing login session cookie",
      "Unable to authorize Discord account",
      "Invalid login URL",
      "Invalid domain",
    ],
    403: [
      "You are missing required permission to view this page",
      "You must be in the guild to view dashboard",
    ],
    408: ["Took too long to login"],
    500: [
      "Unknown internal server error",
      "Unable to retrieve user data",
      "Unable to talk to the database",
    ],
  };
  constructor(private activatedRoute: ActivatedRoute) {
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
    let errorCode = activatedRoute.snapshot.params["error"];
    errorCode = errorCode.split(".");
    this.errorNumber = errorCode[0];
    let x = parseInt(errorCode[1]) - 1;
    if (this.errorStrings[errorCode[0]] === undefined) {
      this.errorMessage = "You cannot access this page!";
      return;
    }
    if (this.errorStrings[errorCode[0]].length < x) {
      this.errorMessage = "You cannot access this page!";
      return;
    }
    this.errorMessage = this.errorStrings[errorCode[0]][
      parseInt(errorCode[1]) - 1
    ];
  }

  ngOnInit(): void {}
}
