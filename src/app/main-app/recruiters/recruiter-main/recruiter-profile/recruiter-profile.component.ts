import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user.service';
import { CorporateUser } from 'src/app/models/corporateuser.model';
import { CorporateUserService } from 'src/app/services/corporateuser.service';
import { IndividualUser } from 'src/app/models/individualuser.model';
import { IndividualUserService } from 'src/app/services/individualuser.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { mimeType } from 'src/app/constants/validators/mime-type.validator';
import { ProfileImageService } from 'src/app/services/profileimage.service';
import { ProfileImage } from 'src/app/models/profileimage.model';
import { UserExperienceService } from 'src/app/services/userexperience.service';
import { UserExperience } from 'src/app/models/userexperience.model';
import { UserSkillsService } from 'src/app/services/userskills.service';
import { UserSkills } from 'src/app/models/userskills.model';

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent implements OnInit {

  corporates: any[] = [];
  individuals: IndividualUser[] = [];
  test_user!:User;

  loading = false;
  avatarUrl?: string;
  user!: User;
  corporateUserArray: any;
  corporateUser: any;
  cardTitle: string = '';
  individualUserPersonal: any;
  individualId = '';
  PersonalData!: boolean;
  ExperienceData!: boolean;
  ImageData!: boolean;
  imagePreview!: string;
  profileImage: any;
  anyAny: any[] = [];
  allUserExperience: any[] = [];
  userExperience: any;
  allUserSkills: any[] = [];
  userSkills: any;
  SkillsData!: boolean;


  errorHandler: boolean = true;
  experienceErrorHandler: boolean = true;
  skillsErrorHandler: boolean = true;


  pictureForm!: FormGroup;



  constructor(
    private usersService: UsersService, 
    private msg: NzMessageService, 
    private corporateUserService: CorporateUserService,
    private individualUserService: IndividualUserService,
    private profileImageService: ProfileImageService,
    private userExperienceService: UserExperienceService,
    private userSkillsService: UserSkillsService
    )
    { 
      this.checkType();
      console.log(usersService.Type);
      console.log(this.individualUserService.Individual);
      this.individualUserService.checkIndividualUser();
      this.checkUserPersonal();

      profileImageService.allProfileImages$.subscribe((anyAny: any) => {
        this.anyAny = anyAny;
      });
      console.log(this.anyAny);

      this.profileImage = this.anyAny.filter((hey: ProfileImage) => {
        return hey.userId == this.usersService.User._id;
      })[0];

      console.log(this.profileImage);
      if (this.profileImage != undefined) {
        this.errorHandler = false;
      }

      // userExperienceService.allUserExperience$.subscribe((allUserExperience: any) => {
      //   this.allUserExperience = allUserExperience;
      //   this.userExperience = this.allUserExperience.filter((userExperience: UserExperience) => {
      //     return userExperience.userId == this.usersService.User._id;
      //   });
      // });

      


      console.log(this.userExperience);
      if (this.userExperience != undefined) {
        this.experienceErrorHandler = false;
      }





      userSkillsService.allUserSkills$.subscribe((allUserSkills: any) => {
        console.log(this.allUserSkills);
        this.allUserSkills = allUserSkills;
        this.userSkills = this.allUserSkills.filter((userSkills: UserSkills) => {
          return userSkills.userId == this.usersService.User._id;
        });
      });

  


      console.log(this.userSkills);
      if (this.userSkills != undefined) {
        this.skillsErrorHandler = false;
      }

      
  }

  // getImage() {
  //   this.profileImage = this.profileImageService.getOneProfileImage();
  // }




  initUser(){
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
  }

  checkType() {
    if (this.usersService.Type == 'individual') {
      this.cardTitle = 'Personal'
    } else {
      this.cardTitle = 'Company';
    }
  }

  checkUserPersonal() {
    this.individualUserService.checkIndividualUser();
    this.individualUserPersonal = this.individualUserService.Individual;
    console.log(this.individualUserPersonal);
  }
  

  onAddPersonal(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.individualUserService.addIndividualData(this.individualUserService.Individual.userId, form.value.firstName, form.value.lastName, form.value.dob)
    .subscribe((result: any) => {
      console.log(result);
    });
    form.reset();
    this.createMessage('success');
    this.checkUserPersonal();
    setInterval(() =>
    this.PersonalData = true
      , 2000);
      this.individualUserService.checkIndividualUser();
      this.checkUserPersonal();
      this.isVisible = false;
      location.reload();
  }

  createMessage(type: string): void {
    this.msg.create(type, `Your account has been created successfully`);
  }


  ngOnInit(): void {
    this.initUser();

    this.pictureForm = new FormGroup({
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.individualUserService.checkIndividualUser();
    this.PersonalData = JSON.parse(<string>localStorage.getItem('personalData')).personalData;
    this.ExperienceData = JSON.parse(<string>localStorage.getItem('experienceData')).experienceData;
    this.ImageData = JSON.parse(<string>localStorage.getItem('imageData')).imageData;
    this.SkillsData = JSON.parse(<string>localStorage.getItem('skillsData')).skillsData;
    console.log(this.SkillsData);

    // this.userExperienceService.getUserExperience();

    this.profileImageService.allProfileImages$.subscribe((anyAny: any) => {
      this.anyAny = anyAny;
    });
    this.profileImageService.getUserProfileImage();

    console.log("ngOnInit runs");
    if (this.anyAny.length == 0) {
      console.log("ende so, hamuna chinhu");
      this.profileImageService.allProfileImages$.subscribe((anyAny: any) => {
        this.anyAny = anyAny;
        console.log(this.anyAny);
        if (this.ImageData && this.profileImage == undefined) {
          console.log("get that data");
          this.profileImage = this.anyAny.filter((hey: ProfileImage) => {
            return hey.userId == this.usersService.User._id;
          })[0];
          console.log(this.profileImage);
          setInterval(() =>
          this.errorHandler = false
        , 500);
          
        }
    });
    }

    // if (this.allUserExperience.length == 0) {
    //   this.userExperienceService.allUserExperience$.subscribe((allUserExperience: any) => {
    //     this.allUserExperience = allUserExperience;
    //     if (this.ExperienceData && this.userExperience.length == 0) {
    //       console.log("get that experience man!!");
    //       this.userExperience = this.allUserExperience.filter((userExperience: UserExperience) => {
    //         return userExperience.userId == this.usersService.User._id;
    //       });
    //       console.log(this.userExperience);
    //       setInterval(() =>
    //           this.experienceErrorHandler = false
    //         , 500);
    //     }
    //   });
    // }

    if (this.allUserSkills.length == 0) {
      this.userSkillsService.allUserSkills$.subscribe((allUserSkills: any) => {
        this.allUserSkills = allUserSkills;
        if (this.SkillsData && this.userSkills.length == 0) {
          console.log("get those skills man!!");
          this.userSkills = this.allUserSkills.filter((userSkills: UserSkills) => {
            return userSkills.userId == this.usersService.User._id;
          });
          console.log(this.userSkills);
          setInterval(() =>
              this.skillsErrorHandler = false
            , 500);
        }
      });
    }

    

    

  }

  check() {
    this.ngOnInit();
  }

  isVisible = false;
  isConfirmLoading = false;


  editPersonalDetails(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.pictureForm.patchValue({image: file});
    this.pictureForm.get('image')?.updateValueAndValidity();
    // console.log(file);
    // console.log(this.pictureForm);
    const reader  = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddImage(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.profileImageService.addProfileImage(this.individualUserService.Individual.userId, this.pictureForm.value.image)
    .subscribe((result: any) => {
      console.log(result);
    });
    this.imageIsVisible = false;
    location.reload();
  }



  // image Modal

  imageIsVisible = false;
  imageIsConfirmLoading = false;

  imageModal(): void {
    this.imageIsVisible = true;
  }

  imageOk(): void {
    this.imageIsConfirmLoading = true;
    setTimeout(() => {
      this.imageIsVisible = false;
      this.imageIsConfirmLoading = false;
    }, 1000);
  }

  imageCancel(): void {
    this.imageIsVisible = false;
  }



  // Experience Modal 

  experienceIsVisible = false;
  experienceIsConfirmLoading = false;

  addExperience(): void {
    this.experienceIsVisible = true;
  }

  experienceModal(): void {
    this.experienceIsVisible = true;
  }

  experienceOk(): void {
    this.experienceIsConfirmLoading = true;
    setTimeout(() => {
      this.experienceIsVisible = false;
      this.experienceIsConfirmLoading = false;
    }, 1000);
  }

  experienceCancel(): void {
    this.experienceIsVisible = false;
  }

  onAddExperience(form: NgForm) {

    if (form.invalid) {
      return;
    }
    // this.userExperienceService.addUserExperience(this.individualUserService.Individual.userId, form.value.title, form.value.summary, form.value.company, form.value.startYear, form.value.endYear, form.value.startMonth, form.value.endMonth)
    // .subscribe((result: any) => {
    //   console.log(result);
    //   form.reset();
    // this.experienceIsVisible = false;
    // this.userExperienceService.init()
    // });
    
  }



  // Skills Modal 

  skillsIsVisible = false;
  skillsIsConfirmLoading = false;

  addSkills(): void {
    this.skillsIsVisible = true;
  }

  skillsModal(): void {
    this.skillsIsVisible = true;
  }

  skillsOk(): void {
    this.skillsIsConfirmLoading = true;
    setTimeout(() => {
      this.skillsIsVisible = false;
      this.skillsIsConfirmLoading = false;
    }, 1000);
  }

  skillsCancel(): void {
    this.skillsIsVisible = false;
  }

  onAddSkill(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userSkillsService.addUserSkill(this.individualUserService.Individual.userId, form.value.skillName)
    .subscribe((result: any) => {
      console.log(result);
      form.reset();
      this.skillsIsVisible = false;
this.userSkillsService.init()
    });

  }

}
