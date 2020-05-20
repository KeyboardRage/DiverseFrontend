import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent {
  searchText;

  @Input() cases$;

  mouseOver(obj) {
    let parentNode = obj.target.parentElement;
    parentNode.style.bottom = "5px";
    parentNode.style.boxShadow = "0 4px 4px rgba(0, 0, 0, .25)";
    parentNode.style.transition = " 0.2s all";
    parentNode.style.borderRadius = "5px";
    parentNode.style.backgroundColor = "#34343E";
  }
  mouseOff(obj) {
    let parentNode = obj.target.parentElement;
    parentNode.style = null;
  }
}
