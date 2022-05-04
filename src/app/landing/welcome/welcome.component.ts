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


  isVisible = false;

  linkText = "JOB SEEKERS";

  constructor(private message: NzMessageService) { }

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


selectChangeHandler(event: any) {
  this.selectedType = event.target.value;
  console.log(this.selectedType);
}


  ngOnInit(): void {
      this.changeText();
  }

}
