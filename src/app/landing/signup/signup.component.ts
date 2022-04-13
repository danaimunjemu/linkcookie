import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  currentStep = 0;
  progressBar = 0;
  nextRoute = 'signup-one';
  previousRoute = '';
  nextText = 'NEXT';
  previousText = 'PREVIOUS';

  percentageChecker():void {
    switch (this.currentStep) {
          case 0: {
            this.progressBar = 0;
            this.nextRoute = 'signup-one';
            this.previousRoute = 'welcome';
            break;
          }
          case 1: {
            this.progressBar = 0;
            this.nextRoute = 'signup-two';
            this.previousRoute = 'signup-welcome';
            break;
          }
          case 2: {
            this.progressBar = 25;
            this.nextRoute = 'signup-three';
            this.previousRoute = 'signup-one';
            break;
          }
          case 3: {
            this.progressBar = 50;
            this.nextRoute = 'signup-four';
            this.previousRoute = 'signup-two';
            break;
          }
          case 4: {
            this.progressBar = 75;
            this.nextRoute = 'signup-final';
            this.previousRoute = 'signup-three';
            break;
          }
          case 5: {
            this.progressBar = 99;
            this.nextRoute = '/login';
            this.previousRoute = 'signup-four';
            break;
          }
          default: {
            this.progressBar = 0;
            this.nextRoute = 'signup-one';
            this.previousRoute = '';
          }
        }
  }

  stepFiveButton() {
    if (this.currentStep == 5) {
      this.nextText = 'PROCEED TO PAYMENT';
    } else {
      this.nextText = 'NEXT';
    }
  }

  startButton() {
    if (this.currentStep == 0) {
      this.nextText = 'START';
      this.previousText = 'GO HOME';
    } else {
      this.nextText = 'NEXT';
      this.previousText = 'PREVIOUS';
    }
  }
  
  finalButton() {
    if (this.currentStep == 3) {
      this.nextText = 'COMPLETE SETUP';
    } else {
      this.nextText = 'NEXT';
    }
  }

  navigateToNext() {
    this.router.navigate([this.nextRoute],{relativeTo:this.route});
    this.currentStep += 1;
    this.percentageChecker();
    this.stepFiveButton();
    this.finalButton();
    this.startButton();
  }

  navigateToPrevious() {
    this.router.navigate([this.previousRoute],{relativeTo:this.route});
    this.currentStep -= 1;
    this.percentageChecker();
  }

  constructor(private route:ActivatedRoute,private router:Router) {}


  ngOnInit(): void {
    this.startButton();
  }

}
