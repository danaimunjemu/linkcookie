import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobTypeFilter'
})
export class JobTypeFilterPipe implements PipeTransform {

  transform(value:any, filterJobType: string) {
    if (value.length === 0 || filterJobType === '' ) {
      return value;
    }

    const adverts = [];
    for (const advert of value) {
      if (advert['jobType'].includes(filterJobType)) {
          adverts.push(advert);
      }
    }
    return adverts;
  }

}
