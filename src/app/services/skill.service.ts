import { Injectable } from "@angular/core";
import { Skills } from "../models/skills.model";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class SkillsService {
    private skills: Skills[] = [];
    private usersUpdated = new Subject<Skills[]>();

    skills$ = new BehaviorSubject([]);

    constructor(private http:HttpClient) { 
        this.init();
     }


    init() {
        this.getSkills().subscribe((skill: any) => {
            this.skills$.next(skill);
        })
    }

    getSkills() {
        return this.http.get(environment.server_url+'skills');
    }

    getUserUpdatedListener() {
        return this.usersUpdated.asObservable();
    }

    addSkill( skillName: string) {
        const skill: Skills = {
            skillName: skillName
        };
        console.log(skill);
        return this.http.post(environment.server_url+'skills', skill);
        console.log(environment.server_url+'skills', skill);
        // this.users.push(user);
        // this.usersUpdated.next([...this.users]);
    }
}

