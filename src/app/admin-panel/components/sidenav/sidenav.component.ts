import { Component, OnInit, Input } from "@angular/core";
import * as $ from "jquery";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  closeNavbar() {
    $(".sidebar").animate(
      {
        right: "100vw"
      },
      500
    );
  }
  logout() {
    this.cookieService.delete("session", "/", "localhost", false, "Lax");
    this.router.navigate(["login"]);
  }
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {}
}
