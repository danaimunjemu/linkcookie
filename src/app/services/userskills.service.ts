import { Injectable, OnInit } from "@angular/core";
import { IndividualUser } from "../models/individualuser.model";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { UsersService } from "./user.service";
import { UserSkills } from "../models/userskills.model";

@Injectable({providedIn: 'root'})
export class UserSkillsService implements OnInit {

    // To store the current user's information
    userID: string = '';
    userSkills: any;

    // To check if the user has an image or not
    skillsDataCheck: boolean = false;

    // Observables
    userSkills$ = new BehaviorSubject([]);
    allUserSkills$ = new BehaviorSubject([]);
    thisIsTheOne$ = new BehaviorSubject([]);


    constructor(private http:HttpClient, private router: Router, private usersService: UsersService) { 
        this.init();
    }

    init() {
        this.getAllSkills().subscribe(
            (skills: any) => {
                this.allUserSkills$.next(skills);
            });
        
        this.getUserSkills();
    }

    
    ngOnInit(): void {
    }

    // Get all profile images
    getAllSkills() {
        return this.http.get(environment.server_url+'userskills');
    }

    // Get the current user's profile image
    getUserSkills() {
        const skillsFilter$ = new BehaviorSubject([]);
        this.userID = this.usersService.User._id;
        return this.getAllSkills().subscribe((skills: any) => {
            skillsFilter$.next(skills);
            const userSkills = skills.filter((currentUserSkills: UserSkills) => {
                return currentUserSkills.userId == this.userID;
            });
            console.log(userSkills.length);
            if (userSkills.length >=1) {
                console.log('This user has skills.');
                this.thisIsTheOne$ = userSkills;
                localStorage.setItem('skillsData', JSON.stringify({skillsData: true}));
                this.skillsDataCheck = JSON.parse(<string>localStorage.getItem('skillsData')).skillsData;
            }
            if (userSkills.length ==0) {
                console.log('This user does not skills.');
                localStorage.setItem('skillsData', JSON.stringify({skillsData: false}));
                this.skillsDataCheck = JSON.parse(<string>localStorage.getItem('skillsData')).skillsData;
                this.userSkills = {
                    userId: this.userID,
                    skillName: ''
                };
            }
        });
    }


    addUserSkill( userId: string, skillName: string) {
        const userSkill: UserSkills = {
            userId: userId,
            skillName: skillName
        }
        return this.http.post(environment.server_url + 'userskills', userSkill);
    }

}