import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from "rxjs/operators";

import { Profile } from "../models/Profile";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private profiles: Profile[] = [];
  private profiles$ = new Subject<Profile[]>();
  readonly url = "http://localhost:3000/api/profiles";

  constructor(private http: HttpClient) {}

  getProfiles() {
    this.http
      .get<{ profiles: Profile[] }>(environment.server_url + 'profilesAll')
      .pipe(
        map((profileData) => {
          return profileData.profiles;
        })
      )
      .subscribe((profiles) => {
        this.profiles = profiles;
        this.profiles$.next(this.profiles);
      });
  }

  getProfilesStream() {
    return this.profiles$.asObservable();
  }

  addProfile(name: string, image: File): void {
    const profileData = new FormData();
    profileData.append("name", name);
    profileData.append("image", image, name);

      this.http
      .post<{ profile: Profile }>(environment.server_url + 'profiles', profileData, {headers: new HttpHeaders({'Content-Type': 'form-data'})})
      .subscribe((profileData) => {
        const profile: Profile = {
          _id: profileData.profile._id,
          name: name,
          imagePath: profileData.profile.imagePath,
        };
        this.profiles.push(profile);
        this.profiles$.next(this.profiles);
      });
  }
}
