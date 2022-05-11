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
import { CountriesService } from 'src/app/services/countries.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  ImageData!: boolean;
  imagePreview!: string;
  profileImage: any;
  anyAny: any[] = [];
  userExperience: any = [];

  countries = this.countriesService.countries;
  country: string = '';
  selectedValue = null;


  errorHandler: boolean = true;
  experienceErrorHandler: boolean = true;
  skillsErrorHandler: boolean = true;


  pictureForm!: FormGroup;



  constructor(
    private usersService: UsersService, 
    private msg: NzMessageService, 
    private individualUserService: IndividualUserService,
    private profileImageService: ProfileImageService,
    private userSkillsService: UserSkillsService,
    private userExperienceService: UserExperienceService,
    private countriesService: CountriesService
    )
    { 

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

      
  }

  // getImage() {
  //   this.profileImage = this.profileImageService.getOneProfileImage();
  // }




  initUser(){
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
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
    this.createMessage('success', 'Your account has been created successfully');
      this.individualUserService.checkIndividualUser();
      this.isVisible = false;
      location.reload();
  }

  createMessage(type: string, message:string): void {
    this.msg.create(type, message);
  }


  ngOnInit(): void {
    this.initUser();

    this.pictureForm = new FormGroup({
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.individualUserService.checkIndividualUser();
    this.ImageData = JSON.parse(<string>localStorage.getItem('imageData')).imageData;

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

  indexOfElement: number = 0;

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

  editExperienceIsVisible = false;
  editExperienceIsConfirmLoading = false;

  editExperience(indexOfElement: any): void {
    console.log(indexOfElement);
    this.indexOfElement= indexOfElement;
    let currentExperience =  this.user.experience[indexOfElement];
    console.log(currentExperience);
    this.editExperienceIsVisible = true;
  }

  editExperienceModal(): void {
    this.editExperienceIsVisible = true;
  }

  editExperienceOk(): void {
    this.editExperienceIsConfirmLoading = true;
    setTimeout(() => {
      this.editExperienceIsVisible = false;
      this.editExperienceIsConfirmLoading = false;
    }, 1000);
  }

  editExperienceCancel(): void {
    this.editExperienceIsVisible = false;
  }

  deleteExperienceIsVisible = false;
  deleteExperienceIsConfirmLoading = false;
  selectedExperience: any;
  selectedSkill: any;


  deleteExperience(indexOfElement: any): void {
    console.log(indexOfElement);
    this.indexOfElement= indexOfElement;
    this.selectedExperience = this.user.experience[indexOfElement];
    this.deleteExperienceIsVisible = true;
  }

  deleteExperienceModal(): void {
    this.deleteExperienceIsVisible = true;
  }

  deleteExperienceOk(): void {
    this.deleteExperienceIsConfirmLoading = true;
    setTimeout(() => {
      this.deleteExperienceIsVisible = false;
      this.deleteExperienceIsConfirmLoading = false;
    }, 1000);
  }

  deleteExperienceCancel(): void {
    this.deleteExperienceIsVisible = false;
  }

  onAddExperience(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const experienceData: any = {
      title: form.value.title,
      description: form.value.description,
      company: form.value.company,
      startYear: form.value.startYear,
      endYear: form.value.endYear,
      startMonth: form.value.startMonth,
      endMonth: form.value.endMonth,
    }
    const userID = this.user._id;
    this.usersService.addUserExperience(userID, experienceData);
    this.initUser();
    this.experienceIsVisible = false;
  }

  onEditExperience(form: NgForm, indexOfElement: number) {
    if (form.invalid) {
      return;
    }
    console.log(indexOfElement);
    const experienceData: any = {
      title: form.value.title,
      description: form.value.description,
      company: form.value.company,
      startYear: form.value.startYear,
      endYear: form.value.endYear,
      startMonth: form.value.startMonth,
      endMonth: form.value.endMonth,
    }
    console.log(experienceData);
    const userID = this.user._id;
    this.usersService.editUserExperience(userID, experienceData, indexOfElement);
    this.initUser();
    this.editExperienceIsVisible = false;
  }

  onDeleteExperience(indexOfElement: number) {
    const userID = this.user._id;
    this.usersService.deleteUserExperience(userID, this.selectedExperience, indexOfElement);
    this.initUser();
    this.deleteExperienceIsVisible = false;
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

  editSkillsIsVisible = false;
  editSkillsIsConfirmLoading = false;

  editSkills(indexOfElement: any): void {
    console.log(indexOfElement);
    this.indexOfElement= indexOfElement;
    let currentSkill =  this.user.skills[indexOfElement];
    console.log(currentSkill);
    this.editSkillsIsVisible = true;
  }

  editSkillskillsModal(): void {
    this.editSkillsIsVisible = true;
  }

  editSkillsOk(): void {
    this.editSkillsIsConfirmLoading = true;
    setTimeout(() => {
      this.editSkillsIsVisible = false;
      this.editSkillsIsConfirmLoading = false;
    }, 1000);
  }

  editSkillsCancel(): void {
    this.editSkillsIsVisible = false;
  }

  deleteSkillsIsVisible = false;
  deleteSkillsIsConfirmLoading = false;

  deleteSkill(indexOfElement: any): void {
    console.log(indexOfElement);
    this.indexOfElement= indexOfElement;
    this.selectedSkill = this.user.skills[indexOfElement];
    this.deleteSkillsIsVisible = true;
  }

  deleteSkillskillsModal(): void {
    this.deleteSkillsIsVisible = true;
  }

  deleteSkillsOk(): void {
    this.deleteSkillsIsConfirmLoading = true;
    setTimeout(() => {
      this.deleteSkillsIsVisible = false;
      this.deleteSkillsIsConfirmLoading = false;
    }, 1000);
  }

  deleteSkillsCancel(): void {
    this.deleteSkillsIsVisible = false;
  }

  onAddSkill(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const userID = this.user._id;
    console.log(userID);
    // this.usersService.addUserSkill(userID!, form.value.skill)
    // .subscribe((result: any) => {
    //   console.log(result);
    //   form.reset();
    //   this.skillsIsVisible = false;
    //   this.usersService.init()
    //   this.initUser();
    // });
    const userSkill =  {
      skill: form.value.skill
    }
    console.log(userSkill);
    this.usersService.addUserSkill(userID, userSkill);
      this.usersService.init()
      this.initUser();
      this.skillsIsVisible = false;
  }

  onEditSkill(form: NgForm, indexOfElement: number) {
    if (form.invalid) {
      return;
    }
    console.log(indexOfElement);
    const skillData: any = {skill: form.value.skill};
    console.log(skillData);
    const userID = this.user._id;
    this.usersService.editUserSkill(userID, skillData, indexOfElement);
    this.initUser();
    this.editSkillsIsVisible = false;
  }

  onDeleteSkill(indexOfElement: number) {
    const userID = this.user._id;
    const selectedSkill = {skill: this.selectedSkill};
    this.usersService.deleteUserSkill(userID, selectedSkill, indexOfElement);
    this.initUser();
    this.deleteSkillsIsVisible = false;
  }




    // Package Modal 

    packageIsVisible = false;
    packageIsConfirmLoading = false;

    selectedPackage: any;
    deletedPackage: any;
  
    addPackage(): void {
      this.packageIsVisible = true;
    }
  
    packageModal(): void {
      this.packageIsVisible = true;
    }
  
    packageOk(): void {
      this.packageIsConfirmLoading = true;
      setTimeout(() => {
        this.packageIsVisible = false;
        this.packageIsConfirmLoading = false;
      }, 1000);
    }
  
    packageCancel(): void {
      this.packageIsVisible = false;
    }

  editPackageIsVisible = false;
  editPackageIsConfirmLoading = false;

  editPackage(indexOfElement: any): void {
    console.log(indexOfElement);
    this.indexOfElement= indexOfElement;
    let currentPackage =  this.user.packages[indexOfElement];
    console.log(currentPackage);
    this.editPackageIsVisible = true;
  }

  editPackageModal(): void {
    this.editPackageIsVisible = true;
  }

  editPackageOk(): void {
    this.editExperienceIsConfirmLoading = true;
    setTimeout(() => {
      this.editPackageIsVisible = false;
      this.editPackageIsConfirmLoading = false;
    }, 1000);
  }

  editPackageCancel(): void {
    this.editPackageIsVisible = false;
  }

  deletePackageIsVisible = false;
  deletePackageIsConfirmLoading = false;
  


  deletePackage(indexOfElement: any): void {
    this.indexOfElement= indexOfElement;
    this.selectedPackage = this.user.packages[indexOfElement];
    this.deletePackageIsVisible = true;
  }

  deletePackageModal(): void {
    this.deletePackageIsVisible = true;
  }

  deletePackageOk(): void {
    this.deletePackageIsConfirmLoading = true;
    setTimeout(() => {
      this.deletePackageIsVisible = false;
      this.deletePackageIsConfirmLoading = false;
    }, 1000);
  }

  deletePackageCancel(): void {
    this.deletePackageIsVisible = false;
  }
  
    onAddPackage(form: NgForm) {
      if (form.invalid) {
        return;
      }
      console.log(form.value);
      const packageData: any = {
        packageName: form.value.packageName,
        packageSummary: form.value.packageSummary,
        packagePrice: form.value.packagePrice
      }
      const userID = this.user._id;
      this.usersService.addUserPackage(userID, packageData);
      this.initUser();
      this.packageIsVisible = false;
    }

    onEditPackage(form: NgForm, indexOfElement: number) {
      if (form.invalid) {
        return;
      }
      console.log(indexOfElement);
      const packageData: any = {
        packageName: form.value.packageName,
        packageSummary: form.value.packageSummary,
        packagePrice: form.value.packagePrice
      }
      console.log(packageData);
      const userID = this.user._id;
      this.usersService.editUserPackage(userID, packageData, indexOfElement);
      this.initUser();
      this.editPackageIsVisible = false;
    }
  
    onDeletePackage(indexOfElement: number) {
      console.log(indexOfElement);
      console.log(this.selectedPackage);
      const userID = this.user._id;
      this.usersService.deleteUserPackage(userID, this.selectedPackage, indexOfElement);
      this.initUser();
      this.deletePackageIsVisible = false;
    }

    // Basic Modal 

    basicIsVisible = false;
    basicIsConfirmLoading = false;
  
    editBasic(): void {
      this.basicIsVisible = true;
    }
  
    basicModal(): void {
      this.basicIsVisible = true;
    }
  
    basicOk(): void {
      this.basicIsConfirmLoading = true;
      setTimeout(() => {
        this.basicIsVisible = false;
        this.basicIsConfirmLoading = false;
      }, 1000);
    }
  
    basicCancel(): void {
      this.basicIsVisible = false;
    }
  
    onEditBasic(form: NgForm) {
      if (form.invalid) {
        return;
      }
      console.log(form.value);
      const basicUpdate: any = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        country: form.value.country
      }
      const userID = this.user._id;
      this.usersService.updateUser( userID! , basicUpdate)
      .subscribe((result: any) => {
        console.log(result);
        this.createMessage('success', 'Your information has been created successfully');
      }, (err: HttpErrorResponse) => {
        console.log(err.error.message);
        this.createMessage('error', err.error.message);
      });
      this.initUser();
      this.basicIsVisible = false;
    }


        // Pro Modal 

        proIsVisible = false;
        proIsConfirmLoading = false;
      
        editPro(): void {
          this.proIsVisible = true;
        }
      
        proModal(): void {
          this.proIsVisible = true;
        }
      
        procOk(): void {
          this.proIsConfirmLoading = true;
          setTimeout(() => {
            this.proIsVisible = false;
            this.proIsConfirmLoading = false;
          }, 1000);
        }
      
        proCancel(): void {
          this.proIsVisible = false;
        }
      
        onEditPro(form: NgForm) {
          if (form.invalid) {
            return;
          }
          console.log(form.value);
          if (form.value.profession == '') {
            form.value.profession = '';
          }
          if (form.value.industry == '') {
            form.value.industry = '';
          }
          const proUpdate: any = {
            profession: form.value.profession,
            industry: form.value.industry,
            summary: form.value.summary
          }
          const userID = this.user._id;
          this.usersService.updateUser( userID! , proUpdate)
          .subscribe((result: any) => {
            console.log(result);
            this.createMessage('success', 'Your information has been created successfully');
          }, (err: HttpErrorResponse) => {
            console.log(err.error.message);
            this.createMessage('error', err.error.message);
          });
          this.initUser();
          this.proIsVisible = false;
        }


}





    

