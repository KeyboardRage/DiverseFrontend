import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FormCheckService {
  constructor(private http: HttpClient) {}

  async checkID(userID) {
    return this.http
      .get("https://api.diverse.graphics/private/users/" + userID)
      .toPromise()
      .then(() => {
        return true;
      })
      .catch((err) => {
        if (err) return false;
      });
  }
  async readFile(file: File): Promise<string | ArrayBuffer> {
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
}
