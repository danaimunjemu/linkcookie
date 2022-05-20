import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobLocationFilter'
})
export class JobLocationFilterPipe implements PipeTransform {

  transform(value:any, filterCountry: string) {
    if (value.length === 0 || filterCountry === '' ) {
      return value;
    }

    const adverts = [];
    for (const advert of value) {
      if (advert['jobLocation'].includes(filterCountry)) {
          adverts.push(advert);
      }
    }
    return adverts;
  }

}
