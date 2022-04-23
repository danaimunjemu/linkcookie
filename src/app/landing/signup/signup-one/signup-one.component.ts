import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-signup-one',
  templateUrl: './signup-one.component.html',
  styleUrls: ['./signup-one.component.css'],
  providers: [UsersService]
})
export class SignupOneComponent implements OnInit, CanComponentDeactivate {

  changesSaved = false;

  users: User[] = [];
  users2: User[] = [];
  private usersSub!: Subscription;
  rateString: string = '';

  enteredDate: Date = new Date();
  finalDate: string = this.enteredDate.toString();
  selectedType: string = 'individual';

  constructor( private router: Router, private route: ActivatedRoute, public usersService: UsersService, private http: HttpClient, private message: NzMessageService) { }

  selectChangeHandler(event: any) {
    this.selectedType = event.target.value;
    console.log(this.selectedType);
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
  

  getAll(){
    return this.http.get(environment.server_url+'users');
  }

  onAddUser(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.rateString = form.value.rate;

    this.usersService.addUser(form.value.email, form.value.username, form.value.password, this.selectedType, form.value.professionalHeadline, form.value.summary, form.value.hourlyRate, this.finalDate)
    .subscribe((result: any) => {
      console.log(result);
      this.changesSaved = true;
    });
    console.log(form.value);
    form.reset();
    this.createMessage('success');
    setInterval(() =>
      this.router.navigate(['../../login'], {relativeTo: this.route})
      , 2000);
  }


  createMessage(type: string): void {
    this.message.create(type, `Your account has been created successfully`);
  }

 

  // onNextStep() {
  //   this.changesSaved = true;
  //   this.router.navigate(['../signup-two'], {relativeTo: this.route});
  // }

  canDeactivate():  Observable<boolean> | Promise<boolean> | boolean {
    if (!this.changesSaved) {
      return true;
    } else {
      return true;
    }
  };

}
