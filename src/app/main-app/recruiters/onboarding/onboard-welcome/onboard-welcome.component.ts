import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboard-welcome',
  templateUrl: './onboard-welcome.component.html',
  styleUrls: ['./onboard-welcome.component.css']
})
export class OnboardWelcomeComponent implements OnInit {

  constructor() { }

  pageReady: Boolean = false;

  loadPage() {
    setInterval(() =>
      this.pageReady = true
    , 3000);
  }

  ngOnInit() {
    this.loadPage();
  }

}
