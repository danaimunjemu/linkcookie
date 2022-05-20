import { Component, OnInit } from '@angular/core';
import { CorporateUser } from 'src/app/models/corporateuser.model';
import { User } from 'src/app/models/user.model';
import { CorporateUserService } from 'src/app/services/corporateuser.service';
import { UsersService } from 'src/app/services/user.service';
import { Chart } from '@antv/g2';
// import DataSet from '@antv/data-set';
import { CountriesService } from 'src/app/services/countries.service';
import { AdvertService } from 'src/app/services/advert.service';
import { Advert } from 'src/app/models/advert.model';



@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiter-dashboard.component.html',
  styleUrls: ['./recruiter-dashboard.component.css']
})
export class RecruiterDashboardComponent implements OnInit {
  

  profileCompletion = 0;




  // variables
  progressBar = 33;
  user: User;
  myAds: any[]=[];
  appliedAds: any[] = [];
  corporateUser: CorporateUser;

  constructor(
    private usersService: UsersService, 
    private corporateUserService: CorporateUserService,
    private countriesService: CountriesService,
    private advertService: AdvertService,) { 

    this.user = usersService.User;
    this.corporateUser = corporateUserService.Corporate;
    // console.log(this.corporateUser);


  

  // console.log(countries.filter((country: any) => {
  //   return country.name == "Zimbabwe"
  // })[0].name);


  }

  initUser(){
    this.usersService.Account.subscribe((user:any)=>{
      this.user=user
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
    this.checkProfileCompletion();

  }


  // This function is used to check how much of the profile the user has completed
  // It adds 10 for a user for each part of the profile that has been completed

  checkProfileCompletion () {
    const userProfile: User = this.usersService.User;
    if (this.usersService.Type == 'individual') {
      if (userProfile.experience.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.firstName.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.lastName.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.profession.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.skills.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.imagePath != null)  {
        this.profileCompletion +=10;
      }
      if (userProfile.country != null)  {
        this.profileCompletion +=10;
      }
      if (userProfile.summary != null)  {
        this.profileCompletion +=10;
      }
      if (userProfile.packages.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.billingAddress != null)  {
        this.profileCompletion +=10;
      }
    }
    if (this.usersService.Type == 'corporate') {
      this.profileCompletion += 10;
      if (userProfile.experience.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.companyName.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.industry.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.skills.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.imagePath != null)  {
        this.profileCompletion +=10;
      }
      if (userProfile.country != null)  {
        this.profileCompletion +=10;
      }
      if (userProfile.summary != null)  {
        this.profileCompletion +=10;
      }
      if (userProfile.packages.length > 1)  {
        this.profileCompletion +=10;
      }
      if (userProfile.billingAddress != null)  {
        this.profileCompletion +=10;
      }
    }
    console.log(this.profileCompletion);
    
  }


  ngOnInit(): void {
    this.initUser();
  }

}
