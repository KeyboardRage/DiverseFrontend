import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CasesService {
  constructor(private http: HttpClient) {}
  showCase(id) {
    this.getCase(id).subscribe((res: any) => {
      console.log(res.data);
    });
  }
  getCase(id) {
    return this.http.get("https://api.diverse.graphics/public/cases/" + id);
  }

  getCases() {
    return this.http.get("https://api.diverse.graphics/public/cases/");
  }
  getBans() {
    return this.http.get("https://api.diverse.graphics/public/cases?flags=128");
  }
}
