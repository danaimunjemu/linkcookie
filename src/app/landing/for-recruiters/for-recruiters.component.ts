import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-for-recruiters',
  templateUrl: './for-recruiters.component.html',
  styleUrls: ['./for-recruiters.component.css']
})
export class ForRecruitersComponent implements OnInit {

  isVisible = false;


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

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = []; 

  constructor() { }

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

}
