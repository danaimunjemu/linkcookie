import { Component, OnInit } from '@angular/core';

interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

@Component({
  selector: 'app-recruiter-ads',
  templateUrl: './recruiter-ads.component.html',
  styleUrls: ['./recruiter-ads.component.css']
})
export class RecruiterAdsComponent implements OnInit {


  isVisible = false;

  constructor() { }

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

   data: ItemData[] = [];


   listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = []; 

  ngOnInit(): void {
    this.loadData(1);

    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;

  }

  loadData(pi: number): void {
    this.data = new Array(5).fill({}).map((_, index) => ({
      href: 'http://ant.design',
      title: `Project Manager ${index}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: 'The Eastern Line Company is looking for an experienced project manager for a senior position.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    }));
  }


}
