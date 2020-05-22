import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import * as JWT from "jwt-decode";

@Component({
  selector: "app-new-case",
  templateUrl: "./new-case.component.html",
  styleUrls: ["./new-case.component.scss"],
})
export class NewCaseComponent implements OnInit {
  userID = "";
  DWC = false;
  description = "";
  imageupload = "";
  caseType = "";
  imageurl = "";
  imageUploadError = "";
  files: File[] = [];

  onSelect(event) {
    this.imageUploadError = "";
    if (event.rejectedFiles.length > 0) {
      this.imageUploadError = "PLEASE UPLOAD A VALID IMAGE";
    }
    this.files.push(...event.addedFiles);
  }
  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = (e) => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error("No file to read.");
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }
  highlightType(event) {
    event.target.style.borderLeft = "";

    let value = event.target.value;
    if (value == "DWC") {
      event.target.style.borderLeft = "5px solid #DAD416";
    }
    if (value == "Ban") {
      event.target.style.borderLeft = "5px solid #EB5757";
    }
    if (value == "Kick") {
      event.target.style.borderLeft = "5px solid #D68C49";
    }
    if (value == "Mute") {
      event.target.style.borderLeft = "5px solid #56CCF2";
    }
    if (value == "Warn") {
      event.target.style.borderLeft = "5px solid #BF8ADB";
    }
    if (value == "Note") {
      event.target.style.borderLeft = "5px solid #8F8F8F";
    }
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  async onSubmit(form) {
    let flags = {
      active: 1,
      note: 2,
      warn: 4,
      mute: 8,
      dwc: 16,
      kick: 32,
      tempban: 64,
      ban: 128,
      archived: 256,
    };

    let decodedJWT: any = JWT(this.cookieService.get("session"));

    let formData = form.value;
    let flag = flags[formData.caseType.toLowerCase()];
    let array: any = {
      user: formData.userID,
      creator: decodedJWT.id,
      creator_tag: `${decodedJWT.username}#${decodedJWT.discriminator}`,
      flags: 1 + flag,
      data: [
        {
          text: formData.description,
        },
      ],
    };
    let promises = [];
    this.files.forEach(async (file) => {
      promises.push(array.data.push({ image: await this.readFile(file) }));
    });
    Promise.all(promises).then(() => {
      this.http
        .post("https://api.diverse.graphics//public/cases", array)
        .subscribe((data) => {
          console.log(data);
        });
    });
  }

  ngOnInit(): void {}
}
