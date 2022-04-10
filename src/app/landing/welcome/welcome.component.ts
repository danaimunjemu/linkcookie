import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isVisible = false;

  linkText = "Job Seekers";

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
        case 'Job Seekers': {
          this.linkText = 'Businesses';
          break;
        }
        case 'Businesses': {
          this.linkText = 'Freelancers';
          break;
        }
        case 'Freelancers': {
          this.linkText = 'Jobseekers';
          break;
        }
       
        default: {
          this.linkText = 'Businesses';
          break;
        }
      }
}

changeText() {
  setInterval(() =>
    this.textChanger()
  , 3000);
}



  ngOnInit(): void {
      this.changeText();
  }

}
