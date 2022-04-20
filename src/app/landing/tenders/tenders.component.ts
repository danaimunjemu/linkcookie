import { Component, OnInit } from '@angular/core';


interface ItemData {
  href: string;
  title: string;
  avatar: string;
  job: string;
  description: string;
  content: string;
}

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.css']
})
export class TendersComponent implements OnInit {

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
    this.data = new Array(1).fill({}).map((_, index) => ({
      href: 'http://ant.design',
      title: `Meta Platforms Inc`,
      job: `Sr. Back-End Developer`,
      avatar: '../../../../../assets/images/part4.jpg',
      description: 'The Eastern Line Company is looking for an experienced project manager for a senior position.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    }));
  }

}
