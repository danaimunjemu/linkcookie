import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adSkillsFilter'
})
export class AdSkillsFilterPipe implements PipeTransform {

  transform(value:any, filterSkills: string[]) {
    if (value.length === 0 || filterSkills.length === 0 ) {
      return value;
    }

    const adverts = [];
    for (const advert of value) {
      
      if (filterSkills.every(skill => advert['adSkills'].includes(skill))) {
        adverts.push(advert);
      }
    }
    return adverts;
  }

}
