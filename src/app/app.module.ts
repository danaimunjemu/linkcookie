import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { SignupFinalComponent } from './landing/signup/signup-final/signup-final.component';
import { PaywaySimComponent } from './main-app/shared/payway-sim/payway-sim.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAlertModule } from 'ng-zorro-antd/alert';
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
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { TermsComponent } from './landing/terms/terms.component';
import { PrivacyComponent } from './landing/privacy/privacy.component';
import { GeneralTermsComponent } from './landing/general-terms/general-terms.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzElementPatchModule } from 'ng-zorro-antd/core/element-patch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { PersonalDetailsComponent } from './main-app/recruiters/recruiter-main/recruiter-profile/personal-details/personal-details.component';
import { ProfileImageService } from './services/profileimage.service';
import { PasswordStrengthMeterModule, PSM_CONFIG } from 'angular-password-strength-meter';
import zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import { OnboardingComponent } from './main-app/recruiters/onboarding/onboarding.component';
import { HttpConfigInterceptor } from './constants/helpers/http.interceptor';
import { OnboardWelcomeComponent } from './main-app/recruiters/onboarding/onboard-welcome/onboard-welcome.component';
import { OnboardFirstComponent } from './main-app/recruiters/onboarding/onboard-first/onboard-first.component';
import { OnboardSecondComponent } from './main-app/recruiters/onboarding/onboard-second/onboard-second.component';
import { OnboardThirdComponent } from './main-app/recruiters/onboarding/onboard-third/onboard-third.component';
import { OnboardBasicComponent } from './main-app/recruiters/onboarding/onboard-basic/onboard-basic.component';
import { OnboardIndustryComponent } from './main-app/recruiters/onboarding/onboard-industry/onboard-industry.component';
import { OnboardImageComponent } from './main-app/recruiters/onboarding/onboard-image/onboard-image.component';
import { ChatComponent } from './main-app/recruiters/recruiter-main/chat/chat.component';




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
    SignupFinalComponent,
    PaywaySimComponent,
    ContactUsComponent,
    TendersComponent,
    TermsComponent,
    PrivacyComponent,
    GeneralTermsComponent,
    PersonalDetailsComponent,
    OnboardingComponent,
    OnboardWelcomeComponent,
    OnboardFirstComponent,
    OnboardSecondComponent,
    OnboardThirdComponent,
    OnboardBasicComponent,
    OnboardIndustryComponent,
    OnboardImageComponent,
    ChatComponent,
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
    SlickCarouselModule,
    NzCollapseModule,
    NzEmptyModule,
    NzElementPatchModule,
    NzUploadModule,
    NzPageHeaderModule,
    NzBadgeModule,
    NzAlertModule,
    NzNotificationModule,
    PasswordStrengthMeterModule.forRoot()
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    CanDeactivateGuard, 
    ProfileImageService,
    {
      provide: PSM_CONFIG,
      useValue: {
        translations: zxcvbnEnPackage.translations,
        dictionary: {
          ...zxcvbnEnPackage.dictionary,
        }}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
