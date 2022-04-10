import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-final',
  templateUrl: './signup-final.component.html',
  styleUrls: ['./signup-final.component.css']
})
export class SignupFinalComponent implements OnInit {

  creationComplete() {

  }

  percent = 0;
  signupProgressText = "Setting up your account";

  increase(): void {
    this.percent = this.percent + 20;
    this.textChanger();
    if (this.percent > 100) {
      this.percent = 100;
    }
  }

  textChanger():void {
    switch (this.percent) {
          case 0: {
            this.signupProgressText = 'Setting up your account';
            break;
          }
          case 20: {
            this.signupProgressText = 'Adding your information';
            break;
          }
          case 40: {
            this.signupProgressText = 'Adding your information';
            break;
          }
          case 60: {
            this.signupProgressText = 'Securing your account';
            break;
          }
          case 80: {
            this.signupProgressText = '1 more second...';
            break;
          }
          case 100: {
            this.signupProgressText = 'Sign Up Complete!';
            break;
          }
         
          default: {
            this.signupProgressText = 'Proceed to Log In';
            break;
          }
        }
  }

  // decline(): void {
  //   this.percent = this.percent - 10;
  //   if (this.percent < 0) {
  //     this.percent = 0;
  //   }
  // }

  constructor() { }


  changePercent() {
    setInterval(() =>
      this.increase()
    , 2000);
  }

  ngOnInit(): void {
    this.creationComplete();
    this.changePercent();
  }

}
