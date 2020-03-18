import { Pipe, PipeTransform } from "@angular/core";
import { filter } from "rxjs/operators";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(items, searchTerm: string) {
    if (!items) return null;
    if (!searchTerm) return items;

    searchTerm = searchTerm.toLowerCase();
    const result = items.filter(item => {
      const userFound = item.user.includes(searchTerm);

      const caseFound = item.case.toString() == searchTerm;
      const usernameFound = item.user_tag.includes(searchTerm);
      const creatorFound = item.creator.includes(searchTerm);
      const creatornameFound = item.creator_tag
        .toLowerCase()
        .includes(searchTerm);
      const textFound = item.data[0].text.includes(searchTerm);

      return (
        userFound ||
        creatorFound ||
        usernameFound ||
        textFound ||
        creatornameFound ||
        caseFound
      );
    });
    return result;
  }
}
