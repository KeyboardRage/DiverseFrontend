import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterImages",
})
export class FilterImagesPipe implements PipeTransform {
  transform(items) {
    let res = items.filter((item) => {
      return !item.image;
    });

    return res;
  }
}
