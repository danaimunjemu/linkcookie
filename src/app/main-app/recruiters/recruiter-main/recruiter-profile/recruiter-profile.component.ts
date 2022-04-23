import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user.service';
import { CorporateUser } from 'src/app/models/corporateuser.model';
import { CorporateUserService } from 'src/app/services/corporateuser.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent implements OnInit {

  corporates: any[] = [];

  loading = false;
  avatarUrl?: string;
  user: any;
  corporateUserArray: any;
  corporateUser: any;
  // corporateUser: CorporateUser;


  constructor(private usersService: UsersService, private msg: NzMessageService, private corporateUserService: CorporateUserService) { 
      this.init();
  }


  init() {
    this.user = this.usersService.User;
    this.corporateUserArray = this.corporateUserService.Corporate;
    this.corporateUser = this.corporateUserArray[0];
  }


  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  ngOnInit(): void {
    this.init();
  }

}
