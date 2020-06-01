import { Pipe, PipeTransform } from "@angular/core";
import { filter, retry } from "rxjs/operators";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(items, searchTerm: string) {
    if (!items) return null;
    if (!searchTerm) return items;

    searchTerm = searchTerm.toLowerCase();

    const result = items.filter((item) => {
      return item.case.toString() == searchTerm;
    });
    if (result.length === 0) {
      const result = items.filter((item) => {
        const usernameFound = item.user_tag.toLowerCase().includes(searchTerm);
        const creatorFound = item.creator.includes(searchTerm);
        const userFound = item.user === searchTerm;
        const creatornameFound = item.creator_tag
          .toLowerCase()
          .includes(searchTerm);
        let message;
        if (item.data[0].text) {
          message = item.data[0].text.includes(searchTerm);
        }
        return (
          usernameFound ||
          creatorFound ||
          creatornameFound ||
          userFound ||
          message
        );
      });
      if (result.length === 0) {
        const result = items.filter((item) => {
          if (item.data[0].text) {
            return item.data[0].text.includes(searchTerm);
          }
        });
        return result;
      }
      return result;
    }

    return result;
  }
}
