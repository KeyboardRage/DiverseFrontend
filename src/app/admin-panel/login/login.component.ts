import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  template: "<div class='fullbody'>STEALING ALL YOUR DATA....</div>",
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private http: HttpClient) { }

}
