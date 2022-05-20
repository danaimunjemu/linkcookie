import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth.model";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Advert } from "../models/advert.model";

@Injectable({providedIn: 'root'})
export class AdvertService {


    adverts$= new BehaviorSubject([]);
    advert$ = new BehaviorSubject([]);

    constructor(
      private http:HttpClient, 
      private router: Router, 
      private notificationService:NzNotificationService) { 
        this.init();
     }

     init() {
        this.getAdverts().subscribe((adverts: any) => {
            this.adverts$.next(adverts);
        });
     }

    

     applyJob(jobId: any, applicant: any) {
        return this.http.put<{advert: any}>(environment.server_url + 'advert/' + jobId, applicant)
        .subscribe((response: any) => {
          let advert : any = response;
          console.log(advert);
          advert.applicants.push(applicant.applicant);

          this.updateAdvert(advert._id, advert).subscribe();
            this.notificationService.success("Update","successful");
            this.init();
        });
     }

    getAdverts() {
        return this.http.get(environment.server_url+'advert');
    }

    getOneAdvert(advertId: any) {
      return this.http.get(environment.server_url + 'advert/' + advertId)
    }

    viewApplicants(advertId: any) {

    }


    addAdvert( advert: any) {
        return this.http.post(environment.server_url+'advert', advert);
    }

    updateAdvert(id:string, advert:any){
      return this.http.put(environment.server_url+'advert/'+id, advert);
     }
}

