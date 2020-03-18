import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../../landing/landing.component.scss"]
})
export class LoginComponent {
  constructor() {
    window.location.href =
      "https://api.diverse.graphics/public/login?redirect=https://localhost:4200/admin/";
  }
}
