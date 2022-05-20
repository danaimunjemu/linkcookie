import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subscription } from 'rxjs';
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
import { UserExperienceService } from 'src/app/services/userexperience.service';
import { UserExperience } from 'src/app/models/userexperience.model';
import { UserSkillsService } from 'src/app/services/userskills.service';
import { UserSkills } from 'src/app/models/userskills.model';
import { CountriesService } from 'src/app/services/countries.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent implements OnInit {

  form!: FormGroup;
  profile!: Profile;
  imageData!: any;

  corporates: any[] = [];
  individuals: IndividualUser[] = [];
  test_user!:User;

  // loading = false;
  avatarUrl?: string;
  user!: User;
  ImageData!: boolean;
  profileImage: any;
  anyAny: any[] = [];
  userExperience: any = [];
  currentUser!: User;

  shortLink: string = "";
    loading: boolean = false; // Flag variable
    file!: File; // Variable to store file

  countries = this.countriesService.countries;
  country: string = '';
  selectedValue = null;

  

  profiles: Profile[] = [];
  private profileSubscription!: Subscription;


  errorHandler: boolean = true;
  experienceErrorHandler: boolean = true;
  skillsErrorHandler: boolean = true;


  // Image Upload
  profilePictureForm!: FormGroup;
  imagePreview!: any;





  constructor(
    private usersService: UsersService, 
    private msg: NzMessageService, 
    private individualUserService: IndividualUserService,
    private userSkillsService: UserSkillsService,
    private userExperienceService: UserExperienceService,
    private countriesService: CountriesService,
    private profileService: ProfileService,
    private http: HttpClient
    
    )
    { }





  initUser(){
    this.usersService.init();
    this.usersService.Account.subscribe((user:any)=>{this.user=user});
    this.usersService.users$.subscribe((users: any) => {
      this.currentUser = users.filter((user: any) => {
        return user._id = user._id;
      })
    })
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

    this.profileService.getProfiles();
    this.profileSubscription = this.profileService
      .getProfilesStream()
      .subscribe((profiles: Profile[]) => {
        this.profiles = profiles;
      });

    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
    

  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => { 
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.profileService.addProfile(this.form.value.name, this.form.value.image);
    console.log(this.form.value.name, this.form.value.image);
    this.form.reset();
    this.imageData = null;
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

  onChange(event: any) {
    this.file = event.target.files[0];
}

// OnClick of button Upload
onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {

                // Short link via api response
                this.shortLink = event.link;

                this.loading = false; // Flag variable 
            }
        }
    );
}

upload(file: File):Observable<any> {
  
  // Create form data
  const formData = new FormData(); 
    
  // Store form name as "file" with file data
  formData.append("file", file, file.name);
    
  // Make http post request over api
  // with formData as req
  return this.http.post(environment.server_url + 'profiles', formData)
}

  onImagePicked(event: Event) {
    // const file = (event.target as HTMLInputElement).files![0];
    // this.profilePictureForm.patchValue({image: file});
    // this.profilePictureForm.get('image')?.updateValueAndValidity();
    // const reader  = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result as string;
    // };
    // reader.readAsDataURL(file);
  }

  onAddImage() {
    // if (this.profilePictureForm.invalid) {
    //   return;
    // }
    // const userId: any = this.user._id;
    // this.profileImageService.addProfileImage(userId, this.profilePictureForm.value.image);
    // this.imageIsVisible = false;
    // location.reload();
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
      this.initUser();
      this.usersService.init();
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





    

