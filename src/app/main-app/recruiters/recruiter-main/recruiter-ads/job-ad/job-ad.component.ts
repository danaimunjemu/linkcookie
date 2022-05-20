import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { from } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AdvertService } from 'src/app/services/advert.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-job-ad',
  templateUrl: './job-ad.component.html',
  styleUrls: ['./job-ad.component.css']
})
export class JobAdComponent implements OnInit {

  user!: User;

  selectedType: string = 'full time';
  selectedLength: string = 'More than 6 Months';
  jobTypeToggler = false;
  current = 0;

  countries = this.countriesService.countries;
  country: string = '';
  listOfSelectedValue = [];
  listOfJobDescription = [];
  jobDescription = [];


  jobAdvert = {
    userId: '',
    type: '',
    payment: '',
    dateCreated: '',
    dateDue: '',
    adSkills: [],
    jobDescription: [],
    adTitle: '',
    adSummary: '',
    jobType: '',
    jobLength: '',
    jobSalary: '',
    jobLocation: ''
  }

  enteredDate: Date = new Date();
  finalDate: string = this.enteredDate.toString();

  selectJobTypeHandler(event: any) {
    this.selectedType = event.target.value;
    if (this.selectedType == "part time") {
      this.jobTypeToggler = true;
    } else {
      this.jobTypeToggler = false;
    }
    console.log(this.selectedType);
  }

  selectLengthHandler(event: any) {
    this.selectedLength = event.target.value;
    console.log(this.selectedLength);
  }

  default = "Error";
  section1 = true;
  section2 = false;
  section3 = false;
  section4 = false;

  initUser(){
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    this.advertService.addAdvert(this.jobAdvert)
    .subscribe((result: any) => {
      console.log(result);
      this.createMessage('success', 'Your advert has been added successfully');
      this.advertService.init();
    }, (err: HttpErrorResponse) => {
      console.log(err.error.message);
      this.createMessage('error', err.error.message);
    });
  }

  createMessage(type: string, message:string): void {
    this.message.create(type, message);
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.section1 = true;
        this.section2= false;
        this.section3=false;
        this.section4 = false;
        break;
      }
      case 1: {
        this.section1 = false;
        this.section2= true;
        this.section3=false;
        this.section4 = false;
        break;
      }
      case 2: {
        this.section1 = false;
        this.section2= false;
        this.section3=true;
        this.section4 = false;
        break;
      }
      case 3: {
        this.section1 = false;
        this.section2= false;
        this.section3=false;
        this.section4 = true;
        break;
      }
      default: {
        this.default = 'error';
      }
    }
  }

  constructor(
    private usersService: UsersService,
    private countriesService: CountriesService,
    private advertService: AdvertService,
    private message: NzMessageService
  ) { 
  }

  ngOnInit(): void {
    this.initUser();
  }

  onAddBasic(form: NgForm) {
    this.jobAdvert.adSkills = form.value.skills;
    this.jobAdvert.jobDescription = form.value.jobDescription;
    this.jobAdvert.type = 'Job';
    const currentUserId: any = this.user._id;
    this.jobAdvert.dateCreated = this.finalDate;
    this.jobAdvert.userId = currentUserId;
    this.jobAdvert.adTitle = form.value.adTitle;
    this.jobAdvert.adSummary = form.value.adSummary;
    this.current += 1;
    this.changeContent();
    console.log(this.jobAdvert);
  }

  onAddJobInfo(form: NgForm) {
    if (form.value.remote == true) {
      this.jobAdvert.jobLocation = "Remote"
    }
    if (this.selectedType == "full time") {
      this.jobAdvert.jobLength = '';
    }
    if (this.selectedType == "part time") {
      this.jobAdvert.jobLength = this.selectedLength;
    }
    this.jobAdvert.jobType = this.selectedType;
    this.current += 1;
    this.changeContent();
    console.log(this.jobAdvert);
  }

  onAddMeta(form: NgForm) {
    if (this.jobAdvert.jobLocation == "") {
      this.jobAdvert.jobLocation = form.value.country;
    }
    var finalDateDue = form.value.dateDue.toString();
    this.jobAdvert.dateDue = finalDateDue;
    this.current += 1;
    this.changeContent();
    console.log(this.jobAdvert);
  }

}
