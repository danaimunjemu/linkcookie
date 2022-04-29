import { Component, OnInit } from '@angular/core';
import { CorporateUser } from 'src/app/models/corporateuser.model';
import { User } from 'src/app/models/user.model';
import { CorporateUserService } from 'src/app/services/corporateuser.service';
import { IndividualUserService } from 'src/app/services/individualuser.service';
import { ProfileImageService } from 'src/app/services/profileimage.service';
import { UsersService } from 'src/app/services/user.service';
import { UserExperienceService } from 'src/app/services/userexperience.service';
import { UserSkillsService } from 'src/app/services/userskills.service';

@Component({
  selector: 'app-recruiter-main',
  templateUrl: './recruiter-main.component.html',
  styleUrls: ['./recruiter-main.component.css']
})
export class RecruiterMainComponent implements OnInit {

  user: User;

  isCollapsed = false;

  constructor(private corporateUserService: CorporateUserService, 
    private usersService: UsersService, 
    private individualUserService: IndividualUserService, 
    private profileImageService: ProfileImageService,
    private userExperienceService: UserExperienceService,
    private userSkillsService: UserSkillsService
    ) { 
    this.individualUserService.checkIndividualUser();
    this.user = usersService.User;
    this.profileImageService.getUserProfileImage();
    // this.userExperienceService.getUserExperience();
    this.userSkillsService.getUserSkills();
    // console.log(this.corporateUser);
  }

  initUser(){
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
  }

  pageReady: Boolean = false;

  loadPage() {
    setInterval(() =>
      this.pageReady = true
    , 0);
    // fix timeto 3000
  }

  ngOnInit(): void {
    this.initUser();
    this.loadPage();
  }

  notify(): void {
    console.log('notify');
  }

  onLogout() {
    this.usersService.logOut();
  }

}
