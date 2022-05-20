import { Component, OnInit } from '@angular/core';
import { Advert } from 'src/app/models/advert.model';
import { AdvertService } from 'src/app/services/advert.service';
import { UsersService } from 'src/app/services/user.service';


@Component({
  selector: 'app-recruiter-ads',
  templateUrl: './recruiter-ads.component.html',
  styleUrls: ['./recruiter-ads.component.css']
})
export class RecruiterAdsComponent implements OnInit {



  jobAdverts: any[] = [];

  initJobAdverts() {
    this.advertService.adverts$.subscribe((adverts: any) => {
      this.jobAdverts = adverts.filter((advert: Advert) => {
        return advert.type == 'Job';
      });
    });
  }

  constructor(
    private advertService: AdvertService,
    private usersService: UsersService
  ) { }


  ngOnInit(): void {
    this.initJobAdverts();

  }



}
