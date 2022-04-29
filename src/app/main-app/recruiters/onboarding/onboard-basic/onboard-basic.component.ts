import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-onboard-basic',
  templateUrl: './onboard-basic.component.html',
  styleUrls: ['./onboard-basic.component.css']
})
export class OnboardBasicComponent implements OnInit {

  user!: User;
  ifUser!: boolean;
  ifCompany!: boolean;


  constructor( private usersService: UsersService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private message: NzMessageService ) { }


  initUser(){
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
    console.log(this.usersService.Type);
    if (this.usersService.Type == 'individual') {
      this.ifUser = true;
    }
    if (this.usersService.Type == 'coroporate') {
      this.ifCompany = true;
    }
  }

  ngOnInit(): void {
    this.initUser();
  }


  

  onAddUserInfo(form: NgForm){


    const thisUser: User = form.value;
    const thisUserId: string = this.user._id!;
    console.log(thisUserId);

    if (form.invalid) {
      return;
    }
    this.usersService.updateUser( thisUserId , thisUser)
    .subscribe((result: any) => {
      console.log(result);
      this.createMessage('success', 'Your information has been created successfully');
      setInterval(() =>
      this.router.navigate(['../onboard-industry'], {relativeTo: this.route})
      , 2000);
    }, (err: HttpErrorResponse) => {
      console.log(err.error.message);
      this.createMessage('error', err.error.message);
    });

  }


  createMessage(type: string, message:string): void {
    this.message.create(type, message);
  }

}
