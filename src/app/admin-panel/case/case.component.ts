import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CasesService } from "../../services/cases.service";
import { map } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import * as JWT from "jwt-decode";
import { EventManager } from "@angular/platform-browser";
import { FormCheckService } from "src/app/services/form-check.service";
import { flags } from "src/assets/config";

@Component({
  selector: "app-case",
  templateUrl: "./case.component.html",
  styleUrls: ["./case.component.scss"],
})
export class CaseComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private casesService: CasesService,
    private cookieService: CookieService,
    private http: HttpClient,
    private eventManager: EventManager,
    public route: ActivatedRoute,
    public forms: FormCheckService
  ) {
    this.caseID = activatedRoute.snapshot.params["id"];

    this.eventManager.addEventListener(document.body, "paste", (event) => {
      let items = event.clipboardData.items;
      for (var i = 0; i < items.length; i++) {
        // Skip content if not image

        if (items[i].type.indexOf("image") == -1) continue;
        // Retrieve image on clipboard as blob
        var blob = items[i].getAsFile();
        this.files.push(blob);
      }
    });
  }
  description: string = "";
  imageupload: string = "";
  submitted = false;
  imageurl = "";
  imageUploadError = "";
  submitError = "";
  files: File[] = [];
  submitMessage = "";
  caseID: number;
  cases$: any;
  images = [];
  caseData = [];

  onSelect(event) {
    this.imageUploadError = "";
    if (event.rejectedFiles.length > 0) {
      this.imageUploadError = "PLEASE UPLOAD A VALID IMAGE";
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async onSubmit(form) {
    let formData = form.value;
    this.submitted = true;
    console.log(formData);
    console.log(form);

    // Checks to see that all the validation is complete
    if (!form.valid) return;

    // Checks to make sure that either an image or text is submitted
    if (formData.description == "" && this.files.length == 0)
      return (this.submitError = "ATTACH AN IMAGE OR DESCRIPTION!");

    // Get the JWT token to send with the POST request
    let decodedJWT: any = JWT(this.cookieService.get("session"));

    // Create the data to be sent with the POST request
    let array: any = {
      creator: decodedJWT.id,
      creator_tag: `${decodedJWT.username}#${decodedJWT.discriminator}`,
      jwt: this.cookieService.get("session"),
      data: [],
    };

    // If text description present add it to the array

    if (formData.description != "")
      array.data.push({ text: formData.description });

    // Generate Base64 URL to be sent for the attachments
    for await (let file of this.files) {
      await this.forms.readFile(file).then((urlString) => {
        array.data.push({ image: urlString });
      });
    }

    // Send the HTTP request off
    this.submitMessage = "Sending form...";

    this.http
      .put("https://api.diverse.graphics/public/cases/" + this.caseID, array)
      .subscribe((data) => {
        this.submitMessage = "Form successfully submitted";
        this.resetForm();
        this.getData();
        setTimeout(() => {
          this.submitMessage = "";
        }, 2000);
      });
  }

  resetForm() {
    this.description = "";
    this.imageupload = "";
    this.submitted = false;
    this.imageurl = "";
    this.imageUploadError = "";
    this.submitError = "";
    this.files = [];
  }

  getData() {
    this.cases$.toPromise().then((res) => {
      this.caseData = res.data;
      this.images = [];
      res.data.forEach((elem) => {
        if (elem.image) {
          this.images.push(elem.image);
        }
      });
    });
  }
  ngOnInit(): void {
    this.cases$ = this.casesService
      .getCase(this.caseID)
      .pipe(map((data: any) => data.data));
    this.getData();
  }
}
