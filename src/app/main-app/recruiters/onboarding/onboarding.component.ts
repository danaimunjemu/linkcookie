import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {


  currentStep = 0;
  progressBar = 0;
  nextRoute = 'onboard-first';
  previousRoute = '';
  nextText = 'NEXT';
  previousText = 'PREVIOUS';

  percentageChecker():void {
    switch (this.currentStep) {
          case 0: {
            this.progressBar = 0;
            this.nextRoute = 'onboard-first';
            this.previousRoute = 'onboard-welcome';
            break;
          }
          case 1: {
            this.progressBar = 0;
            this.nextRoute = 'onboard-second';
            this.previousRoute = 'signup-welcome';
            break;
          }
          case 2: {
            this.progressBar = 25;
            this.nextRoute = 'onboard-third';
            this.previousRoute = 'onboard-welcome';
            break;
          }
          case 3: {
            this.progressBar = 50;
            this.nextRoute = '';
            this.previousRoute = 'onboard-second';
            break;
          }
          default: {
            this.progressBar = 0;
            this.nextRoute = 'onboard-first';
            this.previousRoute = '';
          }
        }
  }

  stepFiveButton() {
    if (this.currentStep == 3) {
      this.nextText = 'GET STARTED';
    } else {
      this.nextText = 'NEXT';
    }
  }

  startButton() {
    if (this.currentStep == 0) {
      this.nextText = 'START';
      this.previousText = 'PREVIOUS';
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


  constructor(private route:ActivatedRoute,private router:Router) { }

  pageReady: Boolean = false;

  loadPage() {
    setInterval(() =>
      this.pageReady = true
    , 3000);
  }

  ngOnInit() {
    this.loadPage();
    this.startButton();
    console.log(this.nextRoute);
  }



}
