import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit {


  form = new FormGroup({
    jobType: new FormControl('', Validators.required)
  });
   
  get f(){
    return this.form.controls;
  }
   
  submit(){
    console.log(this.form.value);
  }


  currentStep = 1;
  progressBar = 0;
  nextRoute = 'step-two';
  previousRoute = '';
  nextText = 'NEXT';
  previousText = 'PREVIOUS';

  percentageChecker():void {
    switch (this.currentStep) {
          case 1: {
            this.progressBar = 0;
            this.nextRoute = 'step-two';
            this.previousRoute = '';
            break;
          }
          case 2: {
            this.progressBar = 20;
            this.nextRoute = 'step-three';
            this.previousRoute = 'step-one';
            break;
          }
          case 3: {
            this.progressBar = 60;
            this.nextRoute = 'step-four';
            this.previousRoute = 'step-two';
            break;
          }
          case 4: {
            this.progressBar = 80;
            this.nextRoute = 'step-five';
            this.previousRoute = 'step-three';
            break;
          }
          case 5: {
            this.progressBar = 99;
            this.nextRoute = '../checkout';
            this.previousRoute = 'step-four';
            break;
          }
          default: {
            this.progressBar = 0;
            this.nextRoute = 'step-two';
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

  navigateToNext() {
    this.router.navigate([this.nextRoute],{relativeTo:this.route});
    this.currentStep += 1;
    this.percentageChecker();
    this.stepFiveButton();
  }

  navigateToPrevious() {
    this.router.navigate([this.previousRoute],{relativeTo:this.route});
    this.currentStep -= 1;
    this.percentageChecker();
  }

  constructor(private route:ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
  }

}
