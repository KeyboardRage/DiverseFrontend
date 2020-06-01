import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  template: `<div class="page-container">
    <navbar></navbar>
    <main>
      <section class="jumbotron">
        <div class="text-area">
          Redirecting you to login area...
        </div>
        <button
          class="cta-button center-block"
          style="display:block;position:relative;bottom:-1em;"
        >
          <a
            href="https://api.diverse.graphics/public/login?redirect=https://diverse.graphics/admin"
            >Login</a
          >
        </button>
      </section>
    </main>
  </div>`,
})
export class LoginComponent {
  constructor() {
    window.location.href =
      "https://api.diverse.graphics/public/login?redirect=https://diverse.graphics/admin/";
  }
}
