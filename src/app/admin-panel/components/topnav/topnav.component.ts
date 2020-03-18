import { Component, OnInit, Input } from "@angular/core";
import * as $ from "jquery";
import * as JWT from "jwt-decode";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ["./topnav.component.scss"]
})
export class TopnavComponent implements OnInit {
  toggleDropdown() {
    $("#talkbubble").fadeToggle();
  }
  openNavbar() {
    $(".sidebar").animate(
      {
        right: "0vw"
      },
      500
    );
  }
  @Input() button?: boolean;
  @Input() buttonLink? = "";
  @Input() title: string = "";
  @Input() subheader?: string = "";
  @Input() tooltip?: string = "";

  decoded: any = JWT(this.cookieService.get("session"));

  profilePic =
    "https://cdn.discordapp.com/avatars/" +
    this.decoded.id +
    "/" +
    this.decoded.avatar;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {}
}
