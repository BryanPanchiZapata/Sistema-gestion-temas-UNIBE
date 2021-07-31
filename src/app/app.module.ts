import { SpinnerModule } from './components/spinner/spinner.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopicBanckComponent } from './components/topic-banck/topic-banck.component';
import { MaterialModule } from './material/material.module';
import { TopicDenunciationComponent } from './components/topic-denunciation/topic-denunciation.component';
import { TopicProposalComponent } from './components/topic-proposal/topic-proposal.component';
import { TopicNotificationComponent } from './components/topic-notification/topic-notification.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService,  } from "./services/auth.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginComponent } from './components/auth/login.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TopicService } from "./services/topic.service";
import { PaymentRegistrationComponent } from "./components/payment-registration/payment-registration.component";
import { SpinnerInterceptor } from './components/interceptor/spinner.interceptor';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AddTopicComponent } from './components/topic-banck/add-topic/add-topic.component';
import { ExecutedTopicComponent } from './components/topic-banck/executed-topic/executed-topic.component';
import { ExecutingTopicComponent } from './components/topic-banck/executing-topic/executing-topic.component';
import { TopicNotificationListComponent } from './components/topic-notification/topic-notification-list/topic-notification-list.component';
import { TopicNotificationReadComponent } from './components/topic-notification/topic-notification-read/topic-notification-read.component';
import { TopicDenunciationReadComponent } from './components/topic-denunciation/topic-denunciation-read/topic-denunciation-read.component';
import { TopicProposalReadComponent } from './components/topic-proposal/topic-proposal-read/topic-proposal-read.component';


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
    TopicProposalReadComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
