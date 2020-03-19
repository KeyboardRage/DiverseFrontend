import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // this.cookieService.set(
    //   "session",
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODcwMzM4MDg1MTkxNjgyNyIsInVzZXJuYW1lIjoiRnJldWQiLCJhdmF0YXIiOiI4NGMxODFhYzVkMDI1ODJhNmVjZTRiNjIzZjYwZTcyYiIsImRpc2NyaW1pbmF0b3IiOiI4OTQ3IiwibG9jYWxlIjoiZW4tR0IiLCJtZmFfZW5hYmxlZCI6dHJ1ZSwiZmxhZ3MiOjAsInByb3ZpZGVyIjoiZGlzY29yZCIsImZldGNoZWRBdCI6IjIwMjAtMDMtMTlUMTE6NTE6MzQuMzczWiIsImV4cGlyZXNfaW4iOjU5OTgwMCwiaWF0IjoxNTg0NjE4Njk0LCJleHAiOjE1ODUyMjM0OTR9.LFFQiFx5lnojGamESIwpXVCwXqs8EAiaHgIa7d6Yp4c"
    // );
    // return true;

    if (this.cookieService.get("session")) {
      // this.authService.tokenVerify(this.cookieService.get("jwt"));
      // return true;
      if (this.authService.userCheck(this.cookieService.get("session"))) {
        return true;
      }
    }
    this.router.navigate(["login"]);
    return false;
  }
}
