import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import * as JWT from "jwt-decode";
import { EventManager } from "@angular/platform-browser";
import { FormCheckService } from "src/app/services/form-check.service";
import { flags } from "src/assets/config";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  @Input() formType: string = "newCase";
  @Input() caseID: string = "";
  userID: string = "";
  description: string = "";
  submitted = false;
  duration = "";
  caseType = "";
  imageurl = "";
  imageUploadError = "";
  submitError = "";
  files: File[] = [];
  disableButtons = false;
  submitMessage = "";

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private eventManager: EventManager,
    public route: ActivatedRoute,
    public forms: FormCheckService
  ) {
    this.eventManager.addEventListener(document.body, "paste", (event) => {
      if (this.disableButtons) return;
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
      return (this.imageUploadError = "PLEASE UPLOAD A VALID IMAGE");
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
    if (this.disableButtons) return;
    this.files.splice(this.files.indexOf(event), 1);
  }

  async onSubmit(form) {
    let formData = form.value;
    this.submitted = true;
    this.submitError = "";

    // Checks to see that all the validation is complete
    if (!form.valid) return;

    // Checks to make sure that either an image or text is submitted
    if (formData.description == "" && this.files.length == 0)
      return (this.submitError = "ATTACH AN IMAGE OR DESCRIPTION!");

    // Loading message for the user
    this.submitMessage = "Sending form...";

    // Disable the buttons
    this.disableButtons = true;

    // Get the JWT token to send with the POST request
    let decodedJWT: any = JWT(this.cookieService.get("session"));

    //Create the data to be sent with the POST request
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

    if (this.formType == "newCase") {
      // If the case type is "Mute" make sure a duration is specified
      if (formData.caseType == "Mute" && this.duration == "") return;

      // Check to make sure that the user snowflake exists in discord
      this.forms.checkID(formData.userID).then((res) => {
        if (!res) {
          this.submitError = "USER NOT FOUND";
        }
      });

      // Convert the text case type into its numerical case value
      let flag = flags[formData.caseType.toLowerCase()] + 1;

      array.flags = flag;
      array.user = formData.userID;

      // If the case type is Mute add duration to the data to be sent
      if (formData.caseType == "Mute") {
        array.duration = this.duration;
      }

      // Send the HTTP request off
      this.http
        .post("https://api.diverse.graphics/public/cases", array)
        .subscribe(
          (data) => {
            this.submitMessage = "Form successfully submitted";
            this.resetForm();
            this.disableButtons = false;
            setTimeout(() => {
              this.submitMessage = "";
            }, 5000);
          },
          (err) => {
            this.submitMessage = "";
            this.disableButtons = false;
            return (this.submitError =
              "An error occured while submitting the form. Please contact VirtusGraphics#0001 or Freud#8947");
          }
        );
    } else {
      this.http
        .put("https://api.diverse.graphics/public/cases/" + this.caseID, array)
        .subscribe(
          (data) => {
            this.submitMessage = "Form successfully submitted";
            this.resetForm();
            this.updateData.emit();
            this.disableButtons = false;
            setTimeout(() => {
              this.submitMessage = "";
            }, 5000);
          },
          (err) => {
            this.submitMessage = "";
            this.disableButtons = false;

            return (this.submitError =
              "An error occured while submitting the form. Please contact VirtusGraphics#0001 or Freud#8947");
          }
        );
    }
  }

  @Output()
  updateData = new EventEmitter();

  resetForm() {
    if (this.formType == "newCase") {
      this.caseType = "";
      this.userID = "";
      this.duration = "";
      document.querySelector("select").style.borderLeft = "";
    }
    this.description = "";
    this.submitted = false;
    this.imageurl = "";
    this.imageUploadError = "";
    this.submitError = "";
    this.files = [];
  }

  ngOnInit(): void {}
}
