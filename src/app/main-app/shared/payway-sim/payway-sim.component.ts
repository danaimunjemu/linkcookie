import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payway-sim',
  templateUrl: './payway-sim.component.html',
  styleUrls: ['./payway-sim.component.css']
})
export class PaywaySimComponent implements OnInit {

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
            this.signupProgressText = 'Payment in progress';
            break;
          }
          case 100: {
            this.signupProgressText = 'Payment Complete!';
            break;
          }
         
          default: {
            this.signupProgressText = 'Payment in progress';
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
