import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seekers-main',
  templateUrl: './seekers-main.component.html',
  styleUrls: ['./seekers-main.component.css']
})
export class SeekersMainComponent implements OnInit {

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
