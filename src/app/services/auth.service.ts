import { Injectable } from "@angular/core";
import * as JWT from "jwt-decode";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  allowedUsers = [
    "164736401051484160",
    "222673142705815554",
    "109068086191116288",
    "333459879379337216",
    "328347723004641290",
    "82766826148204544",
    "191742594584150016",
    "628703380851916827",
    "155819112319156224"
  ];

  // tokenVerify(token) {
  //   let headers = new HttpHeaders().set(
  //     "Content-Type",
  //     "application/x-www-form-urlencoded"
  //   );
  //   this.http
  //     .post(
  //       "https://api.diverse.graphics/public/login/verify",
  //       {
  //         withCredentials: true
  //       },
  //       { headers }
  //     )
  //     .subscribe((res: any) => {
  //       console.log(res);
  //     });
  // }
  userCheck(jwt) {
    let decoded: any = JWT(jwt);
    let user = this.allowedUsers.filter(item => {
      return decoded.id === item;
    });

    if (user.length != 0) {
      return true;
    }
  }
}
