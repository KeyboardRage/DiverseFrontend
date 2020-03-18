import { Component, OnInit, Input } from "@angular/core";
import * as $ from "jquery";
import { CookieService } from "ngx-cookie-service";

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
    console.log("hello");
    this.cookieService.delete("jwt");
  }
  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {}
}
