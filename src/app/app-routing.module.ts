import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactUsComponent } from "./landing/contact-us/contact-us.component";
import { CrudTrialComponent } from "./landing/crud-trial/crud-trial.component";
import { ForJobseekersComponent } from "./landing/for-jobseekers/for-jobseekers.component";
import { ForRecruitersComponent } from "./landing/for-recruiters/for-recruiters.component";
import { GeneralTermsComponent } from "./landing/general-terms/general-terms.component";
import { HomeComponent } from "./landing/home/home.component";
import { LoginComponent } from "./landing/login/login.component";
import { PrivacyComponent } from "./landing/privacy/privacy.component";
import { CanDeactivateGuard } from "./landing/signup/can-deactivate-guard.service";
import { SignupFinalComponent } from "./landing/signup/signup-final/signup-final.component";
import { SignupFourComponent } from "./landing/signup/signup-four/signup-four.component";
import { SignupOneComponent } from "./landing/signup/signup-one/signup-one.component";
import { SignupThreeComponent } from "./landing/signup/signup-three/signup-three.component";
import { SignupTwoComponent } from "./landing/signup/signup-two/signup-two.component";
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
import { SeekersMainComponent } from "./main-app/jobseekers/seekers-main/seekers-main.component";
import { DeauthGuard } from "./constants/helpers/deauth-guard";

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
            { path: 'crud', component: CrudTrialComponent },
            { path: 'contact-us', component: ContactUsComponent }
        ]
    },

    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent,
        children: [
            {path: '', redirectTo: 'signup-welcome', pathMatch: 'full'},
            { path: 'signup-welcome', component: SignupWelcomeComponent },
            { path: 'signup-one', component: SignupOneComponent,  canDeactivate: [CanDeactivateGuard]},
            { path: 'signup-two', component: SignupTwoComponent },
            { path: 'signup-three', component: SignupThreeComponent },
            { path: 'signup-four', component: SignupFourComponent },
            { path: 'signup-final', component: SignupFinalComponent },
        ]
    },
    { path: 'recruiter-main', component: RecruiterMainComponent, canActivate: [AuthGuard], 
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
    },

    { path: 'seekers', component: SeekersMainComponent, canActivate: [DeauthGuard]}



];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule],
    providers: [AuthGuard, DeauthGuard]
})
export class AppRoutingModule {

}