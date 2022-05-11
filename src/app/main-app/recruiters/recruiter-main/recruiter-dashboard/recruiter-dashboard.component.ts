import { Component, OnInit } from '@angular/core';
import { CorporateUser } from 'src/app/models/corporateuser.model';
import { User } from 'src/app/models/user.model';
import { CorporateUserService } from 'src/app/services/corporateuser.service';
import { UsersService } from 'src/app/services/user.service';
import { Chart } from '@antv/g2';
// import DataSet from '@antv/data-set';
import { CountriesService } from 'src/app/services/countries.service';



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
  corporateUser: CorporateUser;

  constructor(
    private usersService: UsersService, 
    private corporateUserService: CorporateUserService,
    private countriesService: CountriesService) { 

    this.user = usersService.User;
    this.corporateUser = corporateUserService.Corporate;
    // console.log(this.corporateUser);


  

  // console.log(countries.filter((country: any) => {
  //   return country.name == "Zimbabwe"
  // })[0].name);


  }

  initUser(){
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
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
    const data = [
      { year: 'Programming', sales: 140 },
      { year: 'Digital Marketing', sales: 52 },
      { year: 'Graphic Design', sales: 61 },
      { year: 'Writing', sales: 30 },
      { year: 'Finance & Accounting', sales: 48 },
      { year: 'Business Services', sales: 38 },
    ];
    const chart = new Chart({
      container: 'c1',
      autoFit: true,
      height: 220,
    });
    
    chart.data(data);
    chart.scale('sales', {
      nice: true,
    });
    
    chart.tooltip({
      showMarkers: false
    });
    chart.interaction('active-region');
    
    chart.interval().position('year*sales').style({ radius: [20, 20, 0, 0], fill: '#35afe1' });
    
    chart.render();
  }

}
