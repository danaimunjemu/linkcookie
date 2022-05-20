import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Advert } from 'src/app/models/advert.model';
import { User } from 'src/app/models/user.model';
import { AdvertService } from 'src/app/services/advert.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {

  advertId: string = '';
  currentAdvert!: any;
  applicants: User[] = [];
  currentUser: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private advertService: AdvertService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.advertId = data.id;
    });
    this.advertService.adverts$.subscribe((ads: any) => {
      this.currentAdvert = ads.filter((advert: any) => {
        return advert._id == this.advertId;
      })[0];
      const arrayLength: number = this.currentAdvert.applicants.length;
        this.usersService.users$.subscribe((user: any) => {
          for (var userId of this.currentAdvert.applicants) {
            this.currentUser = user.filter((users: any) => {
              return users._id == userId;
            })[0]
            console.log(this.currentUser);
            this.applicants.push(this.currentUser);
          }
          
        })
        


    })
  }

}
