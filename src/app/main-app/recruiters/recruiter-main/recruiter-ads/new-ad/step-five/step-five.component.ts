import { Component, OnInit } from '@angular/core';

interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.css']
})
export class StepFiveComponent implements OnInit {

  data: ItemData[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadData(1);

  }

  loadData(pi: number): void {
    this.data = new Array(1).fill({}).map((_, index) => ({
      href: 'http://ant.design',
      title: `Project Manager`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: 'This is a full-time job as a project manager for construction work for a Property Development firm.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    }));
  }

}
