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
import { LoginComponent, SignUpComponent } from './components/auth/login.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TopicService } from "./services/topic.service";
import { PaymentRegistrationComponent } from "./components/payment-registration/payment-registration.component";
import { TopicStudentComponent } from "./components/topic-student/topic-student.component";
import { SpinnerInterceptor } from './components/interceptor/spinner.interceptor';


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
    TopicStudentComponent,
    SignUpComponent
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
export class AppModule {
}
