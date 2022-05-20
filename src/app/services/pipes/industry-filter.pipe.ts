import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'industryFilter'
})
export class IndustryFilterPipe implements PipeTransform {

  transform(value:any, filterIndustry: string) {
    if (value.length === 0 || filterIndustry === '' ) {
      return value;
    }

    const users = [];
    for (const user of value) {
      if (user['industry'].includes(filterIndustry)) {
          users.push(user);
      }
    }
    return users;
  }

}
