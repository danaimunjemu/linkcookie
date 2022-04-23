import { Component, OnInit } from '@angular/core';
import { CorporateUser } from 'src/app/models/corporateuser.model';
import { User } from 'src/app/models/user.model';
import { CorporateUserService } from 'src/app/services/corporateuser.service';
import { UsersService } from 'src/app/services/user.service';

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
    console.log(this.corporateUser);
  }

  ngOnInit(): void {
  }

}
