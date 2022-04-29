import { Component, OnInit } from '@angular/core';
import { CorporateUser } from 'src/app/models/corporateuser.model';
import { User } from 'src/app/models/user.model';
import { CorporateUserService } from 'src/app/services/corporateuser.service';
import { UsersService } from 'src/app/services/user.service';
import { Chart } from '@antv/g2';
import { Color } from '@antv/g2/lib/dependents';



@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiter-dashboard.component.html',
  styleUrls: ['./recruiter-dashboard.component.css']
})
export class RecruiterDashboardComponent implements OnInit {
  

  // variables
  progressBar = 33;
  user: User;
  corporateUser: CorporateUser;

  constructor(private usersService: UsersService, private corporateUserService: CorporateUserService) { 

    this.user = usersService.User;
    this.corporateUser = corporateUserService.Corporate;
    // console.log(this.corporateUser);
  }

  initUser(){
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
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
      height: 400,
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
