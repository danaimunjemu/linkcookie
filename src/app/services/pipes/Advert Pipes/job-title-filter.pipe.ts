import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobTitleFilter'
})
export class JobTitleFilterPipe implements PipeTransform {

  transform(value:any, filterAdTitle: string) {
    if (value.length === 0 || filterAdTitle === '' ) {
      return value;
    }

    const adverts = [];
    for (const advert of value) {
      if (advert['adTitle'].includes(filterAdTitle)) {
          adverts.push(advert);
      }
    }
    return adverts;
  }

}
