import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  isVisible = false;

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

  // loader(){
  //   myVar = setTimeout(showPage, 3000);
  // }

  // showPage(){
  //   document.getElementById("loader").style.display = "none";
  //   document.getElementById("myDiv").style.display = "block";
  // }


  pageReady: Boolean = false;

  loadPage() {
    setInterval(() =>
      this.pageReady = true
    , 3000);
  }

  ngOnInit() {
    this.loadPage();
  }

  notify(): void {
    console.log('notify');
  }

}
