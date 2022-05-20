import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'professionFilter'
})
export class ProfessionFilterPipe implements PipeTransform {

  transform(value:any, filterProfession: string) {
    if (value.length === 0 || filterProfession === '' ) {
      return value;
    }

    const users = [];
    for (const user of value) {
      if (user['profession'].includes(filterProfession)) {
          users.push(user);
      }
    }
    return users;
  }

}
