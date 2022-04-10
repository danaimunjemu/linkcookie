import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForJobseekersComponent } from "./landing/for-jobseekers/for-jobseekers.component";
import { ForRecruitersComponent } from "./landing/for-recruiters/for-recruiters.component";
import { HomeComponent } from "./landing/home/home.component";
import { LoginComponent } from "./landing/login/login.component";
import { SignupFinalComponent } from "./landing/signup/signup-final/signup-final.component";
import { SignupOneComponent } from "./landing/signup/signup-one/signup-one.component";
import { SignupThreeComponent } from "./landing/signup/signup-three/signup-three.component";
import { SignupTwoComponent } from "./landing/signup/signup-two/signup-two.component";
import { SignupWelcomeComponent } from "./landing/signup/signup-welcome/signup-welcome.component";
import { SignupComponent } from "./landing/signup/signup.component";
import { WelcomeComponent } from "./landing/welcome/welcome.component";
import { NewAdComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/new-ad.component";
import { StepFiveComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-five/step-five.component";
import { StepFourComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-four/step-four.component";
import { StepOneComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-one/step-one.component";
import { StepThreeComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-three/step-three.component";
import { StepTwoComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-two/step-two.component";
import { RecruiterAdsComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/recruiter-ads.component";
import { SingleAdComponent } from "./main-app/recruiters/recruiter-main/recruiter-ads/single-ad/single-ad.component";
import { RecruiterApplicantsComponent } from "./main-app/recruiters/recruiter-main/recruiter-applicants/recruiter-applicants.component";
import { RecruiterBrowseComponent } from "./main-app/recruiters/recruiter-main/recruiter-browse/recruiter-browse.component";
import { RecruiterDashboardComponent } from "./main-app/recruiters/recruiter-main/recruiter-dashboard/recruiter-dashboard.component";
import { RecruiterMainComponent } from "./main-app/recruiters/recruiter-main/recruiter-main.component";
import { RecruiterPaymentComponent } from "./main-app/recruiters/recruiter-main/recruiter-payment/recruiter-payment.component";
import { RecruiterProfileComponent } from "./main-app/recruiters/recruiter-main/recruiter-profile/recruiter-profile.component";
import { RecruiterSettingsComponent } from "./main-app/recruiters/recruiter-main/recruiter-settings/recruiter-settings.component";
import { CartComponent } from "./main-app/shared/cart/cart.component";
import { CheckoutComponent } from "./main-app/shared/checkout/checkout.component";
import { PaywaySimComponent } from "./main-app/shared/payway-sim/payway-sim.component";

const appRoutes: Routes = [
    
    { path: '', redirectTo: '/home/welcome' , pathMatch: 'full'},
    
    { path: 'home', component: HomeComponent, 
        children: [
            {path:'', redirectTo: 'welcome', pathMatch: 'full'},
            {path:'welcome', component: WelcomeComponent},
            { path: 'for-jobseekers', component: ForJobseekersComponent },
            { path: 'for-recruiters', component: ForRecruitersComponent }
        ]
    },

    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent,
        children: [
            {path: '', redirectTo: 'signup-welcome', pathMatch: 'full'},
            { path: 'signup-welcome', component: SignupWelcomeComponent },
            { path: 'signup-one', component: SignupOneComponent },
            { path: 'signup-two', component: SignupTwoComponent },
            { path: 'signup-three', component: SignupThreeComponent },
            { path: 'signup-final', component: SignupFinalComponent },
        ]
    },
    { path: 'recruiter-main', component: RecruiterMainComponent, 
        children: [
            {path:'',redirectTo: 'recruiter-dashboard', pathMatch: 'full'},
            { path: 'recruiter-dashboard', component: RecruiterDashboardComponent },
            { path: 'recruiter-browse', component: RecruiterBrowseComponent },
            { path: 'new-ad', component: NewAdComponent,
                children: [
                    {path:'', redirectTo: 'step-one', pathMatch: 'full'},
                    { path: 'step-one', component: StepOneComponent },
                    { path: 'step-two', component: StepTwoComponent },
                    { path: 'step-three', component: StepThreeComponent },
                    { path: 'step-four', component: StepFourComponent },
                    { path: 'step-five', component: StepFiveComponent },
                ]
             },
            { path: 'recruiter-ads', component: RecruiterAdsComponent, 
                children: [
                    { path: 'single-ad', component: SingleAdComponent },
                ]
            },
            { path: 'cart', component: CartComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'payway-sim', component: PaywaySimComponent },
            { path: 'recruiter-profile', component: RecruiterProfileComponent },
            { path: 'recruiter-settings', component: RecruiterSettingsComponent },
            { path: 'recruiter-payment', component: RecruiterPaymentComponent },
        ] 
    }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}