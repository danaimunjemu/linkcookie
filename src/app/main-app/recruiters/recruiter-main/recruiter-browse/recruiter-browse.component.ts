import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CountriesService } from 'src/app/services/countries.service';
import { UsersService } from 'src/app/services/user.service';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-recruiter-browse',
  templateUrl: './recruiter-browse.component.html',
  styleUrls: ['./recruiter-browse.component.css']
})

export class RecruiterBrowseComponent implements OnInit {

  freelancers: any[]=[];
  corporates!: any;
  browsedUsers$ = new BehaviorSubject([]);

  allFreelancers: any[] = [];

  p: number = 1;
  q: number = 1;



  filteredProfession: string = '';
  filteredIndustry: string = '';
  filteredCountry: string = '';
  filteredSkills: string[] = [];

  profilesPerPage = 8;
  currentPage = 1;
  pageSizeOption = [1, 2, 3,4,5,6,7,8,9, 10, 20];

  

  countries = this.countriesService.countries;


  initUsers() {
    this.usersService.browseUsers$.subscribe((users: any) => {
      this.allFreelancers = users.filter((user: User) => {
        return user.userType == 'individual';
      });
    });


    this.usersService.getBrowseUsers(this.profilesPerPage, this.currentPage).subscribe((browsedUsers: any) => {
      this.browsedUsers$.next(browsedUsers);
    });
    this.browsedUsers$.subscribe((browsedUser: any) => {
      this.freelancers = browsedUser.filter((user: User) => {
        return user.userType == 'individual';
      });
      
    });

    this.usersService.browseUsers$.subscribe((users: any) => {
      this.corporates = users.filter((user: User) => {
        return user.userType == 'corporate';
      });
    });
  }

  // Pagination


  onChangedPage(pageData: PageEvent) {
    this.profilesPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    console.log(pageData);

    this.usersService.getBrowseUsers(this.profilesPerPage, this.currentPage).subscribe((pagedUsers: any) => {
      this.browsedUsers$.next(pagedUsers);
    })
  }



  constructor(
    private usersService: UsersService,
    private countriesService: CountriesService
  ) { }


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


  listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelectedValue: any[] = [];

  listOfOtherOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions: any[] = [];

  demoValue = 0;

  clearFilters() {
    this.filteredProfession = '';
    this.filteredIndustry = '';
    this.filteredCountry = '';
    this.filteredSkills = [];
    this.listOfSelectedValue = [];
  }

  

  ngOnInit(): void {
    this.initUsers();

    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOtherOption = children;
    
  }

  onCloseTitle(): void {
    this.filteredProfession = "";
    this.filteredIndustry = "";
  }


  onCloseCountry(): void {
    this.filteredCountry = "";
  }
  

}
