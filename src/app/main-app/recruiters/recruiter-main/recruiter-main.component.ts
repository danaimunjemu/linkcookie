import { Component, OnInit } from '@angular/core';
import { CorporateUser } from 'src/app/models/corporateuser.model';
import { User } from 'src/app/models/user.model';
import { CorporateUserService } from 'src/app/services/corporateuser.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recruiter-main',
  templateUrl: './recruiter-main.component.html',
  styleUrls: ['./recruiter-main.component.css']
})
export class RecruiterMainComponent implements OnInit {

  corporateUser: CorporateUser;
  user: User;

  isCollapsed = false;

  constructor(private corporateUserService: CorporateUserService, private usersService: UsersService) { 
    this.corporateUser = corporateUserService.Corporate;
    this.user = usersService.User;
    console.log(this.corporateUser);
  }

  pageReady: Boolean = false;

  loadPage() {
    setInterval(() =>
      this.pageReady = true
    , 0);
    // fix timeto 3000
  }

  ngOnInit(): void {
    this.loadPage();
  }

  notify(): void {
    console.log('notify');
  }

  onLogout() {
    this.usersService.logOut();
  }

}
