import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-onboard-industry',
  templateUrl: './onboard-industry.component.html',
  styleUrls: ['./onboard-industry.component.css']
})
export class OnboardIndustryComponent implements OnInit {

  user!: User;
  ifUser!: boolean;
  ifCompany!: boolean;
  selectedProfession: string = '';
  selectedIndustry: string = '';

  constructor( private usersService: UsersService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private message: NzMessageService ) { }

  initUser(){
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
    console.log(this.usersService.Type);
    if (this.usersService.Type == 'individual') {
      this.ifUser = true;
    }
    if (this.usersService.Type == 'corporate') {
      this.ifCompany = true;
    }
  }

  
  selectProfessionHandler(event: any) {
    this.selectedProfession = event.target.value;
    console.log(this.selectedProfession);
  }

  selectIndustryHandler(event: any) {
    this.selectedIndustry = event.target.value;
    console.log(this.selectedIndustry);
  }

  ngOnInit(): void {
    this.initUser();
  }

  onAddUserIndustry(form: NgForm){

    if ( this.selectedProfession == '' && this.selectedIndustry == '') {
      this.createMessage('error', 'Please select an option');
      return;
    }

    const thisUser: any = {
      industry: this.selectedIndustry,
      profession: this.selectedProfession
    };
    const thisUserId: string = this.user._id!;

    if (form.invalid) {
      return;
    }
    this.usersService.updateUser( thisUserId , thisUser)
    .subscribe((result: any) => {
      console.log(result);
      this.createMessage('success', 'User profile updated successfully');
      setInterval(() =>
      this.router.navigate(['../../recruiter-main'], {relativeTo: this.route})
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
