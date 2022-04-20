import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiter-main',
  templateUrl: './recruiter-main.component.html',
  styleUrls: ['./recruiter-main.component.css']
})
export class RecruiterMainComponent implements OnInit {

  constructor() { }

  pageReady: Boolean = false;

  loadPage() {
    setInterval(() =>
      this.pageReady = true
    , 3000);
  }

  ngOnInit(): void {
    this.loadPage();
  }

  notify(): void {
    console.log('notify');
  }

}
