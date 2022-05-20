import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactUsComponent } from "./landing/contact-us/contact-us.component";
import { ForJobseekersComponent } from "./landing/for-jobseekers/for-jobseekers.component";
import { ForRecruitersComponent } from "./landing/for-recruiters/for-recruiters.component";
import { GeneralTermsComponent } from "./landing/general-terms/general-terms.component";
import { HomeComponent } from "./landing/home/home.component";
import { LoginComponent } from "./landing/login/login.component";
import { PrivacyComponent } from "./landing/privacy/privacy.component";
import { CanDeactivateGuard } from "./landing/signup/can-deactivate-guard.service";
import { SignupFinalComponent } from "./landing/signup/signup-final/signup-final.component";
import { SignupOneComponent } from "./landing/signup/signup-one/signup-one.component";
import { SignupWelcomeComponent } from "./landing/signup/signup-welcome/signup-welcome.component";
import { SignupComponent } from "./landing/signup/signup.component";
import { TendersComponent } from "./landing/tenders/tenders.component";
import { TermsComponent } from "./landing/terms/terms.component";
import { WelcomeComponent } from "./landing/welcome/welcome.component";
import { NewAdComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/new-ad.component";
import { StepFiveComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-five/step-five.component";
import { StepFourComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-four/step-four.component";
import { StepOneComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-one/step-one.component";
import { StepThreeComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-three/step-three.component";
import { StepTwoComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-two/step-two.component";
import { RecruiterAdsComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/recruiter-ads.component";
import { SingleAdComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/single-ad/single-ad.component";
import { RecruiterBrowseComponent } from "./main-app/recruiters/recruiter-main/recruiter-browse/recruiter-browse.component";
import { RecruiterDashboardComponent } from "./main-app/recruiters/recruiter-main/recruiter-dashboard/recruiter-dashboard.component";
import { RecruiterMainComponent } from "./main-app/recruiters/recruiter-main/recruiter-main.component";
import { RecruiterPaymentComponent } from "./main-app/recruiters/recruiter-main/recruiter-payment/recruiter-payment.component";
import { RecruiterProfileComponent } from "./main-app/recruiters/recruiter-main/recruiter-profile/recruiter-profile.component";
import { RecruiterSettingsComponent } from "./main-app/recruiters/recruiter-main/recruiter-settings/recruiter-settings.component";
import { CartComponent } from "./main-app/shared/cart/cart.component";
import { CheckoutComponent } from "./main-app/shared/checkout/checkout.component";
import { PaywaySimComponent } from "./main-app/shared/payway-sim/payway-sim.component";
import { AuthGuard } from "./constants/helpers/auth-guard";
import { DeauthGuard } from "./constants/helpers/deauth-guard";
import { LogGuard } from "./constants/helpers/log-guard";
import { PersonalDetailsComponent } from "./main-app/recruiters/recruiter-main/recruiter-profile/personal-details/personal-details.component";
import { OnboardingComponent } from "./main-app/recruiters/onboarding/onboarding.component";
import { OnboardWelcomeComponent } from "./main-app/recruiters/onboarding/onboard-welcome/onboard-welcome.component";
import { OnboardBasicComponent } from "./main-app/recruiters/onboarding/onboard-basic/onboard-basic.component";
import { OnboardIndustryComponent } from "./main-app/recruiters/onboarding/onboard-industry/onboard-industry.component";
import { ChatComponent } from "./main-app/recruiters/recruiter-main/chat/chat.component";
import { ImageUploadComponent } from "./main-app/recruiters/recruiter-main/image-upload/image-upload.component";
import { JobAdComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/job-ad/job-ad.component";
import { ProjectAdComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/project-ad/project-ad.component";
import { TenderAdComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/tender-ad/tender-ad.component";
import { ConsultantAdComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/consultant-ad/consultant-ad.component";
import { AllAdsComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/all-ads/all-ads.component";
import { AdvertsComponent } from "./main-app/recruiters/recruiter-main/adverts/adverts.component";
import { ApplicantsComponent } from "./main-app/recruiters/recruiter-main/adverts/applicants/applicants.component";

const appRoutes: Routes = [
    
    { path: '', redirectTo: '/home/welcome' , pathMatch: 'full'},
    
    { path: 'home', component: HomeComponent, 
        children: [
            {path:'', redirectTo: 'welcome', pathMatch: 'full'},
            {path:'welcome', component: WelcomeComponent},
            { path: 'for-jobseekers', component: ForJobseekersComponent },
            { path: 'for-recruiters', component: ForRecruitersComponent },
            { path: 'tenders', component: TendersComponent },
            { path: 'terms', component: TermsComponent },
            { path: 'general-terms', component: GeneralTermsComponent },
            { path: 'privacy', component: PrivacyComponent },
            { path: 'contact-us', component: ContactUsComponent }
        ]
    },

    { path: 'login', component: LoginComponent,  canActivate: [LogGuard]},
    { path: 'signup', component: SignupComponent,  canActivate: [LogGuard],
        children: [
            {path: '', redirectTo: 'signup-welcome', pathMatch: 'full'},
            { path: 'signup-welcome', component: SignupWelcomeComponent },
            { path: 'signup-one', component: SignupOneComponent},
            { path: 'signup-final', component: SignupFinalComponent },
        ]
    },
    { path: 'onboarding', component: OnboardingComponent,  canActivate: [AuthGuard],
        children: [
            {path:'',redirectTo: 'onboard-welcome', pathMatch: 'full'},
            { path: 'onboard-welcome', component: OnboardWelcomeComponent },
            { path: 'onboard-basic', component: OnboardBasicComponent },
            { path: 'onboard-industry', component: OnboardIndustryComponent },
        ]
    },
    { path: 'recruiter-main', component: RecruiterMainComponent, canActivate: [AuthGuard], 
        children: [
            {path:'',redirectTo: 'recruiter-dashboard', pathMatch: 'full'},
            { path: 'recruiter-dashboard', component: RecruiterDashboardComponent },
            { path: 'recruiter-browse', component: RecruiterBrowseComponent },
            { path: 'image-upload', component: ImageUploadComponent },
            { path: 'chat', component: ChatComponent },
            { path: 'chat', component: ChatComponent },
            { path: 'adverts', component: AdvertsComponent},
            { path: 'adverts/applicants/:id', component: ApplicantsComponent},
            { path: 'recruiter-ads', component: RecruiterAdsComponent, 
                children: [
                    { path: '', redirectTo: 'all-ads', pathMatch: 'full'},
                    { path: 'single-ad', component: SingleAdComponent },
                    { path: 'all-ads', component: AllAdsComponent },
                    { path: 'job-ad', component: JobAdComponent},
                    { path: 'project-ad', component: ProjectAdComponent},
                    { path: 'tender-ad', component: TenderAdComponent},
                    { path: 'consultant-ad', component: ConsultantAdComponent},
                ]
            },
            { path: 'cart', component: CartComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'payway-sim', component: PaywaySimComponent },
            { path: 'recruiter-profile', component: RecruiterProfileComponent,
                children: [
                    {path: 'personal-details', component: PersonalDetailsComponent}
                ]            
            },
            { path: 'recruiter-settings', component: RecruiterSettingsComponent },
            { path: 'recruiter-payment', component: RecruiterPaymentComponent },
        ] 
    }




];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule],
    providers: [AuthGuard, DeauthGuard]
})
export class AppRoutingModule {

}