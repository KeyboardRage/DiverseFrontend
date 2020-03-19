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
  profilePic;

  constructor(private cookieService: CookieService) {
    if (this.cookieService.get("session")) {
      let decoded: any = JWT(this.cookieService.get("session"));

      this.profilePic =
        "https://cdn.discordapp.com/avatars/" +
        decoded.id +
        "/" +
        decoded.avatar;
    }
  }

  ngOnInit(): void {}
}
