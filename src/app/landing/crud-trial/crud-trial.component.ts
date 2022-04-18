import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { Skills } from 'src/app/models/skills.model';
import { SkillsService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-crud-trial',
  templateUrl: './crud-trial.component.html',
  styleUrls: ['./crud-trial.component.css']
})
export class CrudTrialComponent implements OnInit, OnDestroy {

  users: User[] = [];
  users2: User[] = [];
  private usersSub!: Subscription;
  rateString: string = '';

  skills: Skills[] = [];
  
  enteredDate: Date = new Date();
  finalDate: string = this.enteredDate.toString();

  // onAddSkill(form: NgForm){
  //   if (form.invalid) {
  //     return;
  //   }
  //   // this.rateString = form.value.rate;

  //   this.skillsService.addSkill(form.value.skillName).subscribe((result: any) => {
  //     console.log(result);
  //   });
  //   console.log(form.value);
  //   form.reset();
  // }

  onAddUser(form: NgForm){
    if (form.invalid) {
      return;
    }
    // this.rateString = form.value.rate;

    this.usersService.addUser(form.value.email, form.value.username, form.value.password, form.value.userType, form.value.professionalHeadline, form.value.summary, form.value.hourlyRate, this.finalDate)
    .subscribe((result: any) => {
      console.log(result);
    });
    console.log(form.value);
    form.reset();
  }



  constructor(public usersService: UsersService, private http: HttpClient, public skillsService: SkillsService) { }

  getAll(){
    return this.http.get(environment.server_url+'users');
  }

  ngOnInit() {
    // this.users$ = this.usersService.getUsers();
    this.usersSub =  this.usersService.getUserUpdatedListener()
    .subscribe( (users: User[]) => {
      this.users = users;
    } );

    this.usersService.users$.subscribe((users:any)=>{
      console.log(users);
      this.users = users;
  });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

}
