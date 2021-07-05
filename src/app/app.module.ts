import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopicBanckComponent} from './components/topic-banck/topic-banck.component';
import {MaterialModule} from './material/material.module';
import {TopicDenunciationComponent} from './components/topic-denunciation/topic-denunciation.component';
import {TopicProposalComponent} from './components/topic-proposal/topic-proposal.component';
import {TopicNotificationComponent} from './components/topic-notification/topic-notification.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {TopicService} from "./services/topic.service";
import {SignUpAcademic, SignUpComponent} from './components/sign-up/sign-up.component';
import { HeaderComponent } from './components/header/header.component';


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
    SignUpComponent,
    SignUpAcademic,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [
    AuthService,
    TopicService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
