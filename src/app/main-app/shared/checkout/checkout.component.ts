import { Component, OnInit } from '@angular/core';

export interface Data {
  id: number;
  name: string;
  quantity: number;
  total: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  // onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
  //   this.listOfCurrentPageData = listOfCurrentPageData;
  //   this.refreshCheckedStatus();
  // }

  // // refreshCheckedStatus(): void {
  // //   const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
  // //   this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
  // //   this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  // // }

  // onItemChecked(id: number, checked: boolean): void {
  //   this.updateCheckedSet(id, checked);
  //   this.refreshCheckedStatus();
  // }

  // onAllChecked(checked: boolean): void {
  //   this.listOfCurrentPageData
  //     .filter(({ disabled }) => !disabled)
  //     .forEach(({ id }) => this.updateCheckedSet(id, checked));
  //   this.refreshCheckedStatus();
  // }

  // sendRequest(): void {
  //   this.loading = true;
  //   const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
  //   console.log(requestData);
  //   setTimeout(() => {
  //     this.setOfCheckedId.clear();
  //     this.refreshCheckedStatus();
  //     this.loading = false;
  //   }, 1000);
  // }

  ngOnInit(): void {
    this.listOfData = new Array(1).fill(0).map((_, index) => ({
      id: index,
      name: `Project Manager Advert`,
      quantity: 1,
      total: 50,
    }));
  }

}
