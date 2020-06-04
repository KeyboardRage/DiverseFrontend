import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterImages",
})
export class FilterImagesPipe implements PipeTransform {
  transform(items) {
    let res = items.filter((item) => {
      const imageAttach = item.text && !item.image;

      const textAttach =
        item.text &&
        item.text.indexOf("https://cdn.discordapp.com/attachments/") === -1 &&
        item.text.indexOf("https://i.diverse.graphics") === -1;

      return imageAttach || textAttach;
    });
    console.log(res);

    return res;
  }
}
