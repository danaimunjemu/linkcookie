import { Component, OnInit } from '@angular/core';
import { Advert } from 'src/app/models/advert.model';
import { User } from 'src/app/models/user.model';
import { AdvertService } from 'src/app/services/advert.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.css']
})
export class AdvertsComponent implements OnInit {

  user!: User;
  myAds: any[]=[];
  appliedAds: any[] = [];
  currentUser!: any;

  constructor(
    private advertService: AdvertService,
    private usersService: UsersService
  ) {
    this.initUser();
   }

  initUser(){
    this.usersService.Account.subscribe((user:any)=>
    {
      this.user=user;
      this.advertService.adverts$.subscribe((adverts: any) => {
        this.myAds = adverts.filter((advert: Advert) => {
          return advert.userId == this.user._id;
        });
        console.log(this.myAds);
      });
      let userId = this.user._id || '';
      this.advertService.adverts$.subscribe((adverts: any) => {
        this.appliedAds = adverts.filter((advert: Advert) => {
          return advert.applicants.includes(userId);
        });
        console.log(this.appliedAds);
      })
    });
  }

  viewApplicants(advertId: any) {
    this.advertService.getOneAdvert(advertId).subscribe()
  }




  ngOnInit(): void {
    this.initUser();
  }

}
