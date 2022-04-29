import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-signup-one',
  templateUrl: './signup-one.component.html',
  styleUrls: ['./signup-one.component.css'],
  providers: [UsersService]
})
export class SignupOneComponent implements OnInit, CanComponentDeactivate {

  psswrd = '';
  cpsswrd = '';
  strengthMeter = '';

  changesSaved = false;

  users: User[] = [];
  users2: User[] = [];
  private usersSub!: Subscription;
  rateString: string = '';

  enteredDate: Date = new Date();
  finalDate: string = this.enteredDate.toString();
  selectedType: string = 'individual';
  agreeTerms: any;

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

  getStreChange(event: any) {
    switch(event) {
      case 0: {
        this.strengthMeter = 'Weak';
        break;
      }
      case 1: {
        this.strengthMeter = 'Weak';
        break;
      }
      case 2: {
        this.strengthMeter = 'Fair';
        break;
      }
      case 3: {
        this.strengthMeter = 'Good';
        break;
      }
      case 4: {
        this.strengthMeter = 'Strong';
        break;
      }
    }

  }
  

  getAll(){
    return this.http.get(environment.server_url+'users');
  }

  onAddUser(form: NgForm){

    // Check if the passwords match
    if (form.value.password != form.value.confirmPassword) {
      console.log("Passwords do not match")
    }

    const user = {
      email: form.value.email,
      password: form.value.password,
      userType: this.selectedType,
      dateCreated: this.finalDate
    };
    console.log(user);
    if (form.invalid) {
      return;
    }
    this.usersService.addUser(user)
    .subscribe((result: any) => {
      console.log(result);
      this.changesSaved = true;
      form.reset();
      this.createMessage('success', 'Your account has been created successfully');
      setInterval(() =>
      this.router.navigate(['../../login'], {relativeTo: this.route})
      , 2000);
    }, (err: HttpErrorResponse) => {
      console.log(err.error.message);
      this.createMessage('error', err.error.message);
    });
    
  }


  createMessage(type: string, message:string): void {
    this.message.create(type, message);
  }

//  Password Strength Checker

  canDeactivate():  Observable<boolean> | Promise<boolean> | boolean {
    if (!this.changesSaved) {
      return true;
    } else {
      return true;
    }
  };

}
