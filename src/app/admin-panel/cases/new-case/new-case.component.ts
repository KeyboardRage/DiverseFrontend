import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-new-case",
  templateUrl: "./new-case.component.html",
  styleUrls: ["./new-case.component.scss"]
})
export class NewCaseComponent implements OnInit {
  userID = "";
  DWC = false;
  description = "";
  imageupload = "";
  imageurl = "";

  constructor() {}
  onSubmit(form) {
    console.log(form);
  }

  ngOnInit(): void {}
}
