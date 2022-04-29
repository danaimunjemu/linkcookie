import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth.model";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { IndividualUserService } from "./individualuser.service";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({providedIn: 'root'})
export class UsersService {


    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();

    users$ = new BehaviorSubject([]);

    constructor(private http:HttpClient, private router: Router, private notificationService:NzNotificationService) { 
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

    addUser( user: any) {
        return this.http.post(environment.server_url+'user', user);
    }

    updateUser(id:string, user:any){
      console.log( typeof(id), typeof(user));
      // return this.http.put(environment.server_url+'user/'+user._id, user);
      return this.http.put(environment.server_url+'user/'+id, user);
     }

    globalUser: string = '';
    

    addProfileImage( userId: string, image: File) {
      const profileData = new FormData();
      profileData.append("image", image);
      return this.http.put(environment.server_url + 'user/' +userId, profileData);
  }


    login(email: string, password: string) {
        const authData: AuthData = {
            email: email,
            password: password
        };
         this.http.post<{token: string, user: any}>(environment.server_url+'authenticate', authData)
        .subscribe((response:any) => {

          let user : User = response.user;
          console.log(user);
            console.log(response);
            this._Token = response?.token;
            this._User = response.user._id;
            this._Type = response.user.userType;
            console.log(response.user.userType);
            console.log(response.user.logIns);
            console.log(response.user._id);

            let timeStamp: Date = new Date();
            let finalDate: string = timeStamp.toString();

            user.logIns.push(finalDate);

         this.updateUser(response.user._id,user).subscribe()

            this.globalUser = response.user._id;
            this.notificationService.success("Login","successful");

            this.Account.subscribe(
                (user: any) => {
                    this._User = user;
                    this._Type = user.userType;
                    localStorage.setItem('type', user.userType);
                    console.log(user.userType);
                },  
            );
            setTimeout(() => {
              if (user.logIns.length == 1) {
                console.log("You have never logged in");
                this.router.navigateByUrl('onboarding');
              }
              if (user.logIns.length > 1) {
                this.router.navigateByUrl('recruiter-main');
              }
              }, 1000);
        },  (err:any) => {
          console.log(err)
          this.notificationService.error('Oops', err.error.message);
        })
    }

    logOut() {
        localStorage.clear();
    
        this.router.navigateByUrl('');
      }
    


      get Account() {
        return this.http.get(environment.server_url + 'account');
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

