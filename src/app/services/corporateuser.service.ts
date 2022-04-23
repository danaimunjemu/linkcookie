import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { CorporateUser } from "../models/corporateuser.model";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { UsersService } from "./user.service";

@Injectable({providedIn: 'root'})
export class CorporateUserService {

    corporate$ = new BehaviorSubject([]);
    corporateData: CorporateUser[] = [];
    user!: User;
    corporateUser!: CorporateUser;
    userID: string = '';
    thisUser!: CorporateUser;
    anotherUser!: CorporateUser;

    constructor(private http:HttpClient, private router: Router, private usersService: UsersService) { 
        this.init();
        this.userID = usersService.User._id;
        this.getAllCorporates().subscribe((corporates: any) => {
            this.corporate$.next(corporates);
            this.thisUser =  corporates;
            this._Corporate =  this.corporateData = corporates.filter((corporate: CorporateUser) => {
                return corporate.userId == this.userID
            });
        });
     };


     init() {
        this.user = this.usersService.User;
        this.corporateUser = this.Corporate;
    }

    getCorporateDetails(id: string) {
        return this.http.get(environment.server_url+'corporateuser/'+ id);
    }

    getAllCorporates() {
        return this.http.get(environment.server_url+'corporateuser');
    }

    get Corporate() {
        return JSON.parse(<string>localStorage.getItem('corporate'));
    }

    set _Corporate(corporate: CorporateUser) {
        localStorage.setItem('corporate', JSON.stringify(corporate));
      }


    // this.getAllCorporates().subscribe((corporates: any) => {
    //     this.corporate$.next(corporates);
    //     corporates.filter((corporate: any) => {
    //         corporate.userId == this.userID;
    //     });
    // });

}