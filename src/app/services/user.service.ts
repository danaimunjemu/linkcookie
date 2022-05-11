import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth.model";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { IndividualUserService } from "./individualuser.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { UserExperience } from "../models/userexperience.model";

@Injectable({providedIn: 'root'})
export class UsersService {


    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();

    users$ = new BehaviorSubject([]);

    constructor(
      private http:HttpClient, 
      private router: Router, 
      private notificationService:NzNotificationService) { 
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
                this.router.navigateByUrl('onboarding/onboard-basic');
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



      // User Experience

    addUserExperience( userID: any, experienceData: any ) {
     this.http.put<{user: any}>(environment.server_url+'user/'+ userID, experienceData)
    .subscribe((response:any) => {
      let user : User = response.user;

      user.experience.push(experienceData);

      this.updateUser(response.user._id,user).subscribe();
        this.notificationService.success("Update","successful");
        this.init();
    })
  }

  editUserExperience( userID: any, experienceData: any, indexOfElement: number ) {
    this.http.put<{user: any}>(environment.server_url+'user/'+ userID, experienceData)
   .subscribe((response:any) => {
     let user : User = response.user;

     user.experience[indexOfElement] = (experienceData);

     this.updateUser(response.user._id,user).subscribe();
       this.notificationService.success("Update","successful");
       this.init();
   })
 }

 deleteUserExperience( userID: any, selectedExperience: any, indexOfElement: number ) {
  this.http.put<{user: any}>(environment.server_url+'user/'+ userID, selectedExperience)
 .subscribe((response:any) => {
   let user : User = response.user;

   user.experience.splice(indexOfElement, 1);
   

   this.updateUser(response.user._id,user).subscribe();
     this.notificationService.success("Update","Record Deleted");
     this.init();
 })
}

  // User Skills

  addUserSkill( userID: any, userSkill: any) {
    this.http.put<{user: any}>(environment.server_url + 'user/' + userID, userSkill)
    .subscribe((response: any) => {
      let user : User = response.user;
      user.skills.push(userSkill.skill);
      this.updateUser(response.user._id,user).subscribe();
        this.notificationService.success("Update","successful");
        this.init();
    });
}

editUserSkill( userID: any, skillData: any, indexOfElement: number ) {
  this.http.put<{user: any}>(environment.server_url+'user/'+ userID, skillData)
 .subscribe((response:any) => {
   let user : User = response.user;

   user.skills[indexOfElement] = skillData.skill;

   this.updateUser(response.user._id,user).subscribe();
     this.notificationService.success("Update","successful");
     this.init();
 })
}

deleteUserSkill( userID: any, selectedSkill: any, indexOfElement: number ) {
  this.http.put<{user: any}>(environment.server_url+'user/'+ userID, selectedSkill)
 .subscribe((response:any) => {
   let user : User = response.user;


   user.skills.splice(indexOfElement, 1);
  

   this.updateUser(response.user._id,user).subscribe();
     this.notificationService.success("Update","Record Deleted");
     this.init();
 })
}

  // User Package

  addUserPackage( userID: any, packageData: any ) {
    this.http.put<{user: any}>(environment.server_url+'user/'+ userID, packageData)
   .subscribe((response:any) => {
     let user : User = response.user;

     user.packages.push(packageData);

     this.updateUser(response.user._id,user).subscribe();
       this.notificationService.success("Update","successful");
       this.init();
   })
 }

 editUserPackage( userID: any, packageData: any, indexOfElement: number ) {
  this.http.put<{user: any}>(environment.server_url+'user/'+ userID, packageData)
 .subscribe((response:any) => {
   let user : User = response.user;

   user.packages[indexOfElement] = (packageData);

   this.updateUser(response.user._id,user).subscribe();
     this.notificationService.success("Update","successful");
     this.init();
 })
}

deleteUserPackage( userID: any, selectedPackage: any, indexOfElement: number ) {
this.http.put<{user: any}>(environment.server_url+'user/'+ userID, selectedPackage)
.subscribe((response:any) => {
 let user : User = response.user;
 console.log(selectedPackage);
 console.log(indexOfElement);


 user.packages.splice(indexOfElement, 1);
 

 this.updateUser(response.user._id,user).subscribe();
   this.notificationService.success("Update","Record Deleted");
   this.init();
})
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

