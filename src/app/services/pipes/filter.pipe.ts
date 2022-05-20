import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any, filterProfession: string, filterCountry: string) {
    if (value.length === 0 || filterProfession === '' || filterCountry === '' ) {
      return value;
    }

    const users = [];
    for (const user of value) {
      if (user['country'].includes(filterCountry)) {
        if (user['profession'].includes(filterProfession)) {
          users.push(user);
        }
      }
      
    }
    return users;
  }

}
