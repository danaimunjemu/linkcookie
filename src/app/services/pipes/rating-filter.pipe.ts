import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingFilter'
})
export class RatingFilterPipe implements PipeTransform {

  transform(value:any, filterRating: number) {
    if (value.length === 0 || filterRating === 0 ) {
      return value;
    }
    
    const users = [];
    
    for (const user of value) {
    if (user['averageRating'] >= filterRating) {
      users.push(user);
  }
      
    }
    return users;
  }

}
