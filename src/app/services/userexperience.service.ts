import { Injectable, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import { IndividualUser } from "../models/individualuser.model";
import { BehaviorSubject } from "rxjs";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { UsersService } from "./user.service";
import { UserExperience } from "../models/userexperience.model";

@Injectable({providedIn: 'root'})
export class UserExperienceService implements OnInit {

    // To store the current user's information
    userID: string = '';
    userExperience: any;

    // To check if the user has experience or not
    experienceDataCheck: boolean = false;

    // Observables
    currentUserExperience$ = new BehaviorSubject([]);
    allUserExperience$ = new BehaviorSubject([]);
    thisIsTheOne$ = new BehaviorSubject([]);


    constructor(private http:HttpClient, private router: Router, private usersService: UsersService) { 
        this.init();
    }

    init() {
        this.getAllUserExperience().subscribe(
            (userExperiences: any) => {
                this.allUserExperience$.next(userExperiences);
            },(error:any)=>{
                console.log("Error");
            });
        
        // this.getUserExperience();
    }

    
    ngOnInit(): void {
        // this.checkIndividualImage();
    }

    // Get all user experience
    getAllUserExperience() {
        return this.http.get(environment.server_url+'userexperience');
    }

    // Get the current user's user experience
    // getUserExperience() {
    //     const experienceFilter$ = new BehaviorSubject([]);
    //     this.userID = this.usersService.User._id;
    //     return this.getAllUserExperience().subscribe((userExperiences: any) => {
    //         experienceFilter$.next(userExperiences);
    //         const userExperience = userExperiences.filter((currentUserExperience: UserExperience) => {
    //             return currentUserExperience.userId == this.userID;
    //         });
    //         console.log(userExperience.length);
    //         if (userExperience.length >= 1) {
    //             console.log('This user has experience.');
    //             this.thisIsTheOne$ = userExperience;
    //             localStorage.setItem('experienceData', JSON.stringify({experienceData: true}));
    //             this.experienceDataCheck = JSON.parse(<string>localStorage.getItem('experienceData')).experienceData;
    //         }
    //         if (userExperience.length == 0) {
    //             console.log('This user does not have experience.');
    //             localStorage.setItem('experienceData', JSON.stringify({experienceData: false}));
    //             this.experienceDataCheck = JSON.parse(<string>localStorage.getItem('experienceData')).experienceData;
    //             this.userExperience = {
    //                 userId: this.userID,
    //                 imagePath: ''
    //             };
    //         }
    //     });
    // }


    // addUserExperience( title: string, summary: string, company: string, startYear: string, endYear: string, startMonth: string, endMonth: string ) {
    //     const userExperience: UserExperience = {
    //         title: title,
    //         summary: summary,
    //         company: company,
    //         startYear: startYear,
    //         endYear: endYear,
    //         startMonth: startMonth,
    //         endMonth: endMonth
    //     }
    //     return this.http.post(environment.server_url + 'userExperience', userExperience);
    // }


}