import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { mimeType } from 'src/app/constants/validators/mime-type.validator';
import { User } from 'src/app/models/user.model';
import { ProfileImageService } from 'src/app/services/profileimage.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-onboard-image',
  templateUrl: './onboard-image.component.html',
  styleUrls: ['./onboard-image.component.css']
})
export class OnboardImageComponent implements OnInit {

  user!: User;
  pictureForm!: FormGroup;
  imagePreview!: string;


    constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private message: NzMessageService,  private profileImageService: ProfileImageService) { }

  initUser(){
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
  }

  ngOnInit(): void {
    this.initUser();

    this.pictureForm = new FormGroup({
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
  }

  // onAddUserImage(form: NgForm){
  //   const thisUser: User = form.value;
  //   const thisUserId: string = this.user._id!;
  //   console.log(form.value);

  //   if (form.invalid) {
  //     return;
  //   }
  //   this.usersService.updateUser( thisUserId , thisUser)
  //   .subscribe((result: any) => {
  //     console.log(result);
  //     this.createMessage('success', 'Your information has been created successfully');
  //     setInterval(() =>
  //     this.router.navigate(['../onboard-industry'], {relativeTo: this.route})
  //     , 2000);
  //   }, (err: HttpErrorResponse) => {
  //     console.log(err.error.message);
  //     this.createMessage('error', err.error.message);
  //   });

  // }


  createMessage(type: string, message:string): void {
    this.message.create(type, message);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.pictureForm.patchValue({image: file});
    this.pictureForm.get('image')?.updateValueAndValidity();
    console.log(file);
    console.log(this.pictureForm);
    const reader  = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddImage(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }

    const thisUserId: string = this.user._id!;
    console.log(this.pictureForm.value.image);
    this.usersService.addProfileImage(thisUserId, this.pictureForm.value.image)
    .subscribe((result: any) => {
      console.log(result);
    });
  }

}
