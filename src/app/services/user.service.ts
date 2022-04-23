import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth.model";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class UsersService {


    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();

    users$ = new BehaviorSubject([]);

    constructor(private http:HttpClient, private router: Router) { 
        this.init();
     }


    init() {
        this.getUsers().subscribe((users2: any) => {
            this.users$.next(users2);
        })
    }

    getUsers() {
        return this.http.get(environment.server_url+'user');
    }

    getUserUpdatedListener() {
        return this.usersUpdated.asObservable();
    }

    addUser( email: string, username: string, password: string, userType: string, professionalHeadline: string, summary: string, hourlyRate: string, dateCreated: string) {
        const user: User = {
            email: email, 
            username: username, 
            password: password, 
            userType: userType, 
            professionalHeadline: professionalHeadline, 
            summary: summary, 
            hourlyRate: hourlyRate, 
            dateCreated: dateCreated 
        };
        console.log(user);
        return this.http.post(environment.server_url+'user', user);
    }

    globalUser: string = '';


    login(email: string, password: string) {
        const authData: AuthData = {
            email: email,
            password: password
        };
        console.log(authData);
        this.http.post<{token: string, user: any}>(environment.server_url+'authenticate', authData)
        .subscribe(response => {
            console.log(response);
            this._Token = response?.token;
            this._User = response.user._id;
            this._Type = response.user.userType;
            console.log(response.user.userType);
            // console.log(response.user._id);
            this.globalUser = response.user._id;
            this.Account.subscribe(
                (user: any) => {
                    this._User = user;
                    this._Type = user.userType;
                    localStorage.setItem('type', user.userType);
                    console.log(user.userType);
                }
            );
            setTimeout(() => {
                this.router.navigateByUrl('recruiter-main');
              }, 1000);
        })
    }

    logOut() {
        localStorage.clear();
    
        this.router.navigateByUrl('');
      }
    
      get Account() {
        return this.http.get(environment.server_url + 'user/' + this.globalUser );
      }
    
      set _User(user: AuthData) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    
      get User() {
        return JSON.parse(<string>localStorage.getItem('user'));
      }

      set _Type(user: User) {
          localStorage.setItem('type', JSON.stringify(user.userType));
      }
    
      set _Token(token: string) {
        localStorage.setItem('token', token);
      }
    
      get Token() {
        return localStorage.getItem('token');
      }

      get Type() {

        return localStorage.getItem('type');
      }
}

