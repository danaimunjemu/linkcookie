import { Injectable, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import { IndividualUser } from "../models/individualuser.model";
import { BehaviorSubject } from "rxjs";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { UsersService } from "./user.service";
import { ProfileImage } from "../models/profileimage.model";

@Injectable({providedIn: 'root'})
export class ProfileImageService implements OnInit {

    // To store the current user's information
    userID: string = '';
    userImage: any;

    // To check if the user has an image or not
    imageDataCheck: boolean = false;

    // Observables
    userProfileImage$ = new BehaviorSubject([]);
    allProfileImages$ = new BehaviorSubject([]);
    thisIsTheOne$ = new BehaviorSubject([]);


    constructor(private http:HttpClient, private router: Router, private usersService: UsersService) { 
        this.init();
    }

    init() {
        this.getAllProfileImages().subscribe(
            (profileImages: any) => {
                this.allProfileImages$.next(profileImages);
            });
        
        this.getUserProfileImage();
    }

    
    ngOnInit(): void {
        // this.checkIndividualImage();
    }

    // Get all profile images
    getAllProfileImages() {
        return this.http.get(environment.server_url+'profileimage');
    }

    // Get the current user's profile image
    getUserProfileImage() {
        const imagesFilter$ = new BehaviorSubject([]);
        this.userID = this.usersService.User._id;
        return this.getAllProfileImages().subscribe((profileImages: any) => {
            imagesFilter$.next(profileImages);
            const userProfileImage = profileImages.filter((currentUserImage: ProfileImage) => {
                return currentUserImage.userId == this.userID;
            });
            console.log(userProfileImage.length);
            if (userProfileImage.length ==1) {
                console.log('This user has an image.');
                this.thisIsTheOne$ = userProfileImage[0];
                localStorage.setItem('imageData', JSON.stringify({imageData: true}));
                this.imageDataCheck = JSON.parse(<string>localStorage.getItem('imageData')).imageData;
            }
            if (userProfileImage.length ==0) {
                console.log('This user does not have an image.');
                localStorage.setItem('imageData', JSON.stringify({imageData: false}));
                this.imageDataCheck = JSON.parse(<string>localStorage.getItem('imageData')).imageData;
                this.userImage = {
                    userId: this.userID,
                    imagePath: ''
                };
            }
        });
    }



    get profileImage() {
        return JSON.parse(<string>localStorage.getItem('individual'));
    }

    set _profileImage(individual: IndividualUser) {
        localStorage.setItem('individual', JSON.stringify(individual));
      }


    addProfileImage( userId: string, image: File) {
        const profileData = new FormData();
        profileData.append("userId", userId);
        profileData.append("image", image);
        console.log(profileData);
        return this.http.post(environment.server_url + 'profileimage', profileData);
    }
   

}