import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CasesService {
  constructor(private http: HttpClient) {}
  flags = {
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
  showCase(id) {
    this.getCase(id).subscribe((res: any) => {
      console.log(res.data);
    });
  }
  getCase(id) {
    return this.http.get("https://api.diverse.graphics/public/cases/" + id);
  }

  getCases() {
    let flags =
      Object.values(this.flags).reduce((a, b) => a | b) ^ this.flags.ban;

    return this.http.get(
      `https://api.diverse.graphics/public/cases?flags=${flags}&mode=and`
    );
  }
  getBans() {
    return this.http.get("https://api.diverse.graphics/public/cases?flags=128");
  }
}
