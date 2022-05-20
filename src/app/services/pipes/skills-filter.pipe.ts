import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillsFilter'
})
export class SkillsFilterPipe implements PipeTransform {

  transform(value:any, filterSkills: string[]) {
    if (value.length === 0 || filterSkills.length === 0 ) {
      return value;
    }

    const users = [];
    for (const user of value) {
      
      if (filterSkills.every(skill => user['skills'].includes(skill))) {
          users.push(user);
      }
    }
    return users;
  }

}
