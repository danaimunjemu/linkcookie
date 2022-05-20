import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {

  transform(value:any, filterCountry: string) {
    if (value.length === 0 || filterCountry === '' ) {
      return value;
    }

    const users = [];
    for (const user of value) {
      if (user['country'].includes(filterCountry)) {
          users.push(user);
      }
    }
    return users;
  }

}
