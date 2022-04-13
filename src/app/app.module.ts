import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './landing/header/header.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ForJobseekersComponent } from './landing/for-jobseekers/for-jobseekers.component';
import { ForRecruitersComponent } from './landing/for-recruiters/for-recruiters.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './landing/home/home.component';
import { WelcomeComponent } from './landing/welcome/welcome.component';
import { SignupComponent } from './landing/signup/signup.component';
import { LoginComponent } from './landing/login/login.component';
import { RecruiterMainComponent } from './main-app/recruiters/recruiter-main/recruiter-main.component';
import { RHeaderComponent } from './main-app/recruiters/layout/r-header/r-header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RecruiterDashboardComponent } from './main-app/recruiters/recruiter-main/recruiter-dashboard/recruiter-dashboard.component';
import { RecruiterBrowseComponent } from './main-app/recruiters/recruiter-main/recruiter-browse/recruiter-browse.component';
import { RecruiterAdsComponent } from './main-app/recruiters/recruiter-main/recruiter-ads/recruiter-ads.component';
import { RecruiterApplicantsComponent } from './main-app/recruiters/recruiter-main/recruiter-applicants/recruiter-applicants.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RecruiterProfileComponent } from './main-app/recruiters/recruiter-main/recruiter-profile/recruiter-profile.component';
import { RecruiterSettingsComponent } from './main-app/recruiters/recruiter-main/recruiter-settings/recruiter-settings.component';
import { RecruiterPaymentComponent } from './main-app/recruiters/recruiter-main/recruiter-payment/recruiter-payment.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { SingleAdComponent } from './main-app/recruiters/recruiter-main/recruiter-ads/single-ad/single-ad.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NewAdComponent } from './main-app/recruiters/recruiter-main/recruiter-ads/new-ad/new-ad.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { StepOneComponent } from './main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-one/step-one.component';
import { StepTwoComponent } from './main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-two/step-two.component';
import { StepThreeComponent } from './main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-three/step-three.component';
import { StepFourComponent } from './main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-four/step-four.component';
import { StepFiveComponent } from './main-app/recruiters/recruiter-main/recruiter-ads/new-ad/step-five/step-five.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './main-app/shared/cart/cart.component';
import { CheckoutComponent } from './main-app/shared/checkout/checkout.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { SignupWelcomeComponent } from './landing/signup/signup-welcome/signup-welcome.component';
import { SignupOneComponent } from './landing/signup/signup-one/signup-one.component';
import { SignupTwoComponent } from './landing/signup/signup-two/signup-two.component';
import { SignupThreeComponent } from './landing/signup/signup-three/signup-three.component';
import { SignupFinalComponent } from './landing/signup/signup-final/signup-final.component';
import { PaywaySimComponent } from './main-app/shared/payway-sim/payway-sim.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ContactUsComponent } from './landing/contact-us/contact-us.component';
import { TendersComponent } from './landing/tenders/tenders.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { CanDeactivateGuard } from './landing/signup/can-deactivate-guard.service';
import { SwiperModule } from 'swiper/angular';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SignupFourComponent } from './landing/signup/signup-four/signup-four.component';




registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForJobseekersComponent,
    ForRecruitersComponent,
    HomeComponent,
    WelcomeComponent,
    SignupComponent,
    LoginComponent,
    RecruiterMainComponent,
    RHeaderComponent,
    RecruiterDashboardComponent,
    RecruiterBrowseComponent,
    RecruiterAdsComponent,
    RecruiterApplicantsComponent,
    RecruiterProfileComponent,
    RecruiterSettingsComponent,
    RecruiterPaymentComponent,
    SingleAdComponent,
    NewAdComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    CartComponent,
    CheckoutComponent,
    SignupWelcomeComponent,
    SignupOneComponent,
    SignupTwoComponent,
    SignupThreeComponent,
    SignupFinalComponent,
    PaywaySimComponent,
    ContactUsComponent,
    TendersComponent,
    SignupFourComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzModalModule,
    NzButtonModule,
    NzMessageModule,
    AppRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzCardModule,
    NzAvatarModule,
    NzTableModule,
    NzDropDownModule,
    NzTabsModule,
    NzIconModule,
    NzListModule,
    NzBackTopModule,
    NzPaginationModule,
    NzStepsModule,
    NzToolTipModule,
    NzSelectModule,
    NzProgressModule,
    ReactiveFormsModule,
    NzTagModule,
    NzSkeletonModule,
    NzGridModule,
    NzSpaceModule,
    NzRadioModule,
    NzSwitchModule,
    NzRateModule,
    SwiperModule,
    SlickCarouselModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
