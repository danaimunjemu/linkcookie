import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HostListener } from '@angular/core';
import {
  NzSkeletonAvatarShape,
  NzSkeletonAvatarSize,
  NzSkeletonButtonShape,
  NzSkeletonButtonSize,
  NzSkeletonInputSize
} from 'ng-zorro-antd/skeleton';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {


  // Skeleton

  buttonActive = false;
  avatarActive = false;
  inputActive = false;
  imageActive = false;
  buttonSize: NzSkeletonButtonSize = 'default';
  avatarSize: NzSkeletonAvatarSize = 'default';
  inputSize: NzSkeletonInputSize = 'default';
  elementActive = false;
  buttonShape: NzSkeletonButtonShape = 'default';
  avatarShape: NzSkeletonAvatarShape = 'circle';
  elementSize: NzSkeletonInputSize = 'default';


  selectedType: string = 'individual';
  selectedSearch: string = 'employees';


  isVisible = false;
  isEmailVisible = false;

  linkText = "JOB SEEKERS";

  constructor(private message: NzMessageService, private router: Router, private route: ActivatedRoute) { }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  showEmailModal(): void {
    this.isEmailVisible = true;
  }

  handleEmailOk(): void {
    console.log('Button ok clicked!');
    this.isEmailVisible = false;
  }

  handleEmailCancel(): void {
    console.log('Button cancel clicked!');
    this.isEmailVisible = false;
  }

  createMessage(type: string): void {
    this.message.create(type, `Your application was sent successfully ${type}`);
  }

  




  reveal() {
    var reveals = document.querySelectorAll(".banner-img");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("onScreen");
      } else {
        reveals[i].classList.remove("onScreen");
      }
    }
  }
  
  @HostListener("window:scroll", []) onWindowScroll() {
    this.reveal();
}


textChanger():void {
  switch (this.linkText) {
        case 'JOB SEEKERS': {
          this.linkText = 'BUSINESSES';
          break;
        }
        case 'BUSINESSES': {
          this.linkText = 'FREELANCERS';
          break;
        }
        case 'FREELANCERS': {
          this.linkText = 'CONSULTANTS';
          break;
        }
        case 'CONSULTANTS': {
          this.linkText = 'JOB SEEKERS';
          break;
        }
        default: {
          this.linkText = 'BUSINESSES';
          break;
        }
      }
}

changeText() {
  setInterval(() =>
    this.textChanger()
  , 3000);
}

loadEmail() {
  setInterval(() =>
    this.isEmailVisible = true
  , 1000);
}


selectChangeHandler(event: any) {
  this.selectedType = event.target.value;
  console.log(this.selectedType);
}

selectSearchChangeHandler(event: any) {
  this.selectedSearch = event.target.value;
  console.log(this.selectedSearch);
}

onSearch(form: NgForm) {
  console.log(form.value);
  if (form.value.selectedType == 'business' && form.value.selectedSearch == 'employees') {
    this.router.navigate(['../for-recruiters'], {relativeTo: this.route})
  }
  if (form.value.selectedType == 'business' && form.value.selectedSearch == 'tenders') {
    this.router.navigate(['../tenders'], {relativeTo: this.route})
  }
  if (form.value.selectedType == 'business' && form.value.selectedSearch == 'work') {
    this.router.navigate(['../tenders'], {relativeTo: this.route})
  }

  if (form.value.selectedType == 'freelancer' && form.value.selectedSearch == 'employees') {
    this.router.navigate(['../for-recruiters'], {relativeTo: this.route})
  }
  if (form.value.selectedType == 'freelancer' && form.value.selectedSearch == 'tenders') {
    this.router.navigate(['../tenders'], {relativeTo: this.route})
  }
  if (form.value.selectedType == 'freelancer' && form.value.selectedSearch == 'work') {
    this.router.navigate(['../for-jobseekers'], {relativeTo: this.route})
  }

  if (form.value.selectedType == 'consultant' && form.value.selectedSearch == 'employees') {
    this.router.navigate(['../for-recruiters'], {relativeTo: this.route})
  }
  if (form.value.selectedType == 'consultant' && form.value.selectedSearch == 'tenders') {
    this.router.navigate(['../tenders'], {relativeTo: this.route})
  }
  if (form.value.selectedType == 'consultant' && form.value.selectedSearch == 'work') {
    this.router.navigate(['../for-jobseekers'], {relativeTo: this.route})
  }
}




  ngOnInit(): void {
      this.changeText();
      // this.loadEmail();
  }

}
