import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiter-main',
  templateUrl: './recruiter-main.component.html',
  styleUrls: ['./recruiter-main.component.css']
})
export class RecruiterMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  notify(): void {
    console.log('notify');
  }

}
