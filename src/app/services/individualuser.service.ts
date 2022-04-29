import { Injectable, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import { IndividualUser } from "../models/individualuser.model";
import { BehaviorSubject } from "rxjs";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { UsersService } from "./user.service";

@Injectable({providedIn: 'root'})
export class IndividualUserService implements OnInit {

    individuals: IndividualUser[] = [];
    private individualsUpdated = new Subject<IndividualUser[]>();
    individual$ = new BehaviorSubject([]);
    userID: string = '';
    thisUser: any;
    personalDataCheck: boolean = false;
    completionStatus = 33;

    constructor(private http:HttpClient, private router: Router, private usersService: UsersService) { 
        this.init();
    }

    
    ngOnInit(): void {
        this.checkIndividualUser();
    }

    init() {
        // this.getIndividuals().subscribe((individuals: any) => {
        //     this.individuals$ = individuals;
        // })
    }

    getIndividuals() {
        return this.http.get(environment.server_url+'individualuser');
    }

    getIndividualUserUpdateListener () {
        return this.individualsUpdated.asObservable();
    }

    checkIndividualUser() {
        this.userID = this.usersService.User._id;
        this.getIndividuals().subscribe((individualsList: any) => {
            this.individual$.next(individualsList);
            // console.log(individualsList);
            const currentUser = individualsList.filter((individual: IndividualUser) => {
                return individual.userId == this.userID;
            });
            console.log(currentUser.length);
            if (currentUser.length == 1) {
                console.log('tamuwana');
                this.thisUser = currentUser[0];
                this._Individual = this.thisUser;
                localStorage.setItem('personalData', JSON.stringify({personalData: true}));
                console.log(this.personalDataCheck = JSON.parse(<string>localStorage.getItem('personalData')).personalData);
            } if ( currentUser.length == 0) {
                console.log('hamuna chinhu');
                localStorage.setItem('personalData', JSON.stringify({personalData: false}));
                this.personalDataCheck = JSON.parse(<string>localStorage.getItem('personalData')).personalData;
                this.thisUser = {
                    userId: this.userID,
                    firstName: '',
                    lastName: '',
                    dob: ''
                };
                this._Individual = this.thisUser;
            }
            console.log(this.personalDataCheck);
        })
    }


    get Individual() {
        return JSON.parse(<string>localStorage.getItem('individual'));
    }

    set _Individual(individual: IndividualUser) {
        localStorage.setItem('individual', JSON.stringify(individual));
      }


    addIndividualData( userId: string, firstName: string, lastName: string, dob: string ) {
        const individualUser: IndividualUser = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            dob: dob
        };
        console.log(individualUser);
        this.personalDataCheck = true;
        return this.http.post(environment.server_url+'individualuser', individualUser);
    }
   

}