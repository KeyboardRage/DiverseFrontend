import { Component, OnInit, Input } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import * as JWT from "jwt-decode";
import { EventManager } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { FormCheckService } from "src/app/services/form-check.service";
import { flags } from "src/assets/config";

@Component({
  selector: "app-new-case",
  templateUrl: "./new-case.component.html",
  styleUrls: ["./new-case.component.scss"],
})
export class NewCaseComponent implements OnInit {
  caseID: string = "";
  userID: string = "";
  description: string = "";
  imageupload: string = "";
  submitted = false;
  duration = "";
  caseType = "";
  imageurl = "";
  imageUploadError = "";
  submitError = "";
  files: File[] = [];
  submitMessage = "";

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private eventManager: EventManager,
    public route: ActivatedRoute,
    public forms: FormCheckService
  ) {
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
  onSelect(event) {
    this.imageUploadError = "";
    if (event.rejectedFiles.length > 0) {
      this.imageUploadError = "PLEASE UPLOAD A VALID IMAGE";
    }
    this.files.push(...event.addedFiles);
  }

  highlightType(event) {
    let border = event.target.style;

    let value = event.target.value;
    switch (value) {
      case "DWC":
        border.borderLeft = "5px solid #DAD416";
        break;
      case "Ban":
        border.borderLeft = "5px solid #EB5757";
        break;
      case "Kick":
        border.borderLeft = "5px solid #D68C49";
        break;
      case "Mute":
        border.borderLeft = "5px solid #56CCF2";
        break;
      case "Warn":
        border.borderLeft = "5px solid #BF8ADB";
        break;
      case "Note":
        border.borderLeft = "5px solid #8F8F8F";
        break;
      default:
        border = "";
        break;
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async onSubmit(form) {
    let formData = form.value;
    this.submitted = true;

    // Checks to see that all the validation is complete
    if (!form.valid) return;

    // If the case type is "Mute" make sure a duration is specified
    if (formData.caseType == "Mute" && this.duration == "") return;

    // Check to make sure that the user snowflake exists in discord
    this.forms.checkID(formData.userID).then((res) => {
      if (!res) {
        this.submitError = "USER NOT FOUND";
      }
    });

    // Get the JWT token to send with the POST request
    let decodedJWT: any = JWT(this.cookieService.get("session"));

    // Convert the text case type into its numerical case value
    let flag = flags[formData.caseType.toLowerCase()] + 1;

    //Create the data to be sent with the POST request
    let array: any = {
      user: formData.userID,
      creator: decodedJWT.id,
      creator_tag: `${decodedJWT.username}#${decodedJWT.discriminator}`,
      flags: flag,
      jwt: this.cookieService.get("session"),
      data: [
        {
          text: formData.description,
        },
      ],
    };

    // If the case type is Mute add duration to the data to be sent
    if (formData.caseType == "Mute") {
      array.duration = this.duration;
    }

    // Generate Base64 URL to be sent for the attachments
    for await (let file of this.files) {
      await this.forms.readFile(file).then((urlString) => {
        array.data.push({ image: urlString });
      });
    }

    // Send the HTTP request off
    this.http
      .post("https://api.diverse.graphics/public/cases", array)
      .subscribe((data) => {
        this.submitMessage = "Form successfully submitted";
        this.resetForm();
        setTimeout(() => {
          this.submitMessage = "";
        }, 2000);
      });
  }

  resetForm() {
    this.caseType = "";
    this.userID = "";
    this.description = "";
    this.imageupload = "";
    this.submitted = false;
    this.duration = "";
    this.imageurl = "";
    this.imageUploadError = "";
    this.submitError = "";
    this.files = [];
    document.querySelector("select").style.borderLeft = "";
  }

  ngOnInit(): void {}
}
