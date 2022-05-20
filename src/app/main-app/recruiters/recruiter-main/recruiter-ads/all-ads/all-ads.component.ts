import { Component, OnInit } from '@angular/core';
import { Advert } from 'src/app/models/advert.model';
import { User } from 'src/app/models/user.model';
import { AdvertService } from 'src/app/services/advert.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.css']
})
export class AllAdsComponent implements OnInit {
  

  user!: User;
  currentUser!: User;
  advertUploader: any;
  anotherUser: any;

  today: Date = new Date();

  jobAdverts: any[] = [];
  projectAdverts: any[] = [];
  tenderAdverts: any[] = [];


  filteredProfession: string = '';
  filteredIndustry: string = '';
  filteredCountry: string = '';
  filteredSkills: string[] = [];
  filteredAdTitle: string = '';
  selectedType: string = '';

  adSelected: Boolean = false;

  countries = this.countriesService.countries;

  indexOfElement: number = 0;
  selectedAd: any;

  q: number = 1;
  p: number = 1;
  r: number = 1;


  selectJobTypeHandler(event: any) {
    this.selectedType = event.target.value;
    // Each time a type is selected, it sends user bage to paginate page 1
    this.typeFiltering();
  }


  initAdverts() {
    this.advertService.adverts$.subscribe((adverts: any) => {
      this.jobAdverts = adverts.filter((advert: Advert) => {
        return advert.type == 'Job';
      });
      this.usersService.users$.subscribe((user: any) => {
        for (var advert of this.jobAdverts) {
          var advertDue = new Date(advert.dateDue);
          if (this.today > advertDue) {
            advert['adState'] = 'Expired';
          }
          if (this.today < advertDue) {
            advert['adState'] = 'Still On';
          }
          var current!: User;
          advert['current'] = current;
          current = user.filter((users: any) => {
            return users._id == advert.userId;
          })[0];
        }
        
      }) //this is the one
    });
    this.advertService.adverts$.subscribe((adverts: any) => {
      this.projectAdverts = adverts.filter((advert: Advert) => {
        return advert.type == 'Project';
      });
    });
    this.advertService.adverts$.subscribe((adverts: any) => {
      this.tenderAdverts = adverts.filter((advert: Advert) => {
        return advert.type == 'Tender';
      });
    });
  }

  listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelectedValue: any[] = [];

  listOfOtherOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions: any[] = [];

  demoValue = 0;

  constructor(
    private advertService: AdvertService,
    private usersService: UsersService,
    private countriesService: CountriesService
  ) { }

  initUser(){
    this.usersService.init();
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
    this.usersService.users$.subscribe((users: any) => {
      this.currentUser = users.filter((user: any) => {
        return user._id = user._id;
      })
    })
  }

  

  applyJob(jobId: any) {
    const userId = this.user._id;
    const applicant =  {
      applicant: userId
    }
    this.advertService.applyJob(jobId, applicant);
  }

  isVisible = false;

  showModal(indexOfElement: number, adType: string): void {
    var index = indexOfElement;
    console.log(index);
    this.advertService.adverts$.subscribe((adverts: any) => {
      this.selectedAd = adverts.filter((advert: any) => {
        return advert._id == index;
      })[0]
    })
    console.log(this.selectedAd);
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


  ngOnInit(): void {
    this.initAdverts();
    this.initUser();

  }

  clearFilters() {
    this.filteredProfession = '';
    this.filteredIndustry = '';
    this.filteredCountry = '';
    this.filteredSkills = [];
    this.filteredAdTitle = '';
    this.selectedType = '';
    this.listOfSelectedValue = [];
  }

  onCloseTitle(): void {
    this.filteredAdTitle = "";
  }

  onCloseType(): void {
    this.selectedType = "";
  }


  onCloseCountry(): void {
    this.filteredCountry = "";
  }

  // *Filtering is for each time a user starts entering filters
  titleFiltering(event: Event) {
    this.q=1;
  }

  typeFiltering() {
    this.q=1;
  }

  skillsFiltering(event: Event) {
    this.q=1;
  }

  countryFiltering(event: Event) {
    this.q=1;
  }

}
