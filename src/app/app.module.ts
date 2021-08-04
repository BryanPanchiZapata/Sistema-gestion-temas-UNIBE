import { tokenInterceptor } from './components/interceptors/token-user.interceptor';
import { SpinnerModule } from './components/spinner/spinner.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es')
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeTopicComponent, TopicBanckComponent } from './components/topic-banck/topic-banck.component';
import { MaterialModule } from './material/material.module';
import { TopicDenunciationComponent } from './components/topic-denunciation/topic-denunciation.component';
import { TopicProposalComponent } from './components/topic-proposal/topic-proposal.component';
import { TopicNotificationComponent } from './components/topic-notification/topic-notification.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService, } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './components/auth/login.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TopicService } from "./services/topic.service";
import { PaymentRegistrationComponent } from "./components/payment-registration/payment-registration.component";
import { spinnerInterceptor } from './components/interceptors/spinner.interceptor';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AddTopicComponent } from './components/topic-banck/add-topic/add-topic.component';
import { ExecutedTopicComponent } from './components/topic-banck/executed-topic/executed-topic.component';
import { ExecutingTopicComponent } from './components/topic-banck/executing-topic/executing-topic.component';
import { TopicNotificationListComponent } from './components/topic-notification/topic-notification-list/topic-notification-list.component';
import { TopicNotificationReadComponent } from './components/topic-notification/topic-notification-read/topic-notification-read.component';
import { TopicDenunciationReadComponent } from './components/topic-denunciation/topic-denunciation-read/topic-denunciation-read.component';
import { TopicProposalReadComponent } from './components/topic-proposal/topic-proposal-read/topic-proposal-read.component';
import { SearchComponent } from './components/search/search.component';
import { SearchPipe } from './components/pipe/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TopicBanckComponent,
    TopicDenunciationComponent,
    TopicProposalComponent,
    TopicNotificationComponent,
    NavbarComponent,
    ProfileComponent,
    LoginComponent,
    PaymentRegistrationComponent,
    SignUpComponent,
    AddTopicComponent,
    ExecutedTopicComponent,
    ExecutingTopicComponent,
    TopicNotificationListComponent,
    TopicNotificationReadComponent,
    TopicDenunciationReadComponent,
    ChangeTopicComponent,
    TopicProposalReadComponent,
    SearchComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    SpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    TopicService,
    spinnerInterceptor,
    tokenInterceptor,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
