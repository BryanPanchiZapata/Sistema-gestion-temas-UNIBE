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
import { TopicStudentComponent } from './components/topic-student/topic-student.component';
import { PaidRegistrationComponent } from './components/paid-registration/paid-registration.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [AppComponent, TopicBanckComponent, TopicDenunciationComponent, TopicProposalComponent, TopicNotificationComponent, NavbarComponent, ProfileComponent, TopicStudentComponent, PaidRegistrationComponent, HeaderComponent, ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
