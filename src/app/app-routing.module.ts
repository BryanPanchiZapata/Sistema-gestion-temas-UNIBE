import { TopicProposalReadComponent } from './components/topic-proposal/topic-proposal-read/topic-proposal-read.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { TopicBanckComponent } from './components/topic-banck/topic-banck.component';
import { TopicNotificationComponent } from './components/topic-notification/topic-notification.component';
import { LoginComponent } from './components/auth/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopicProposalComponent } from './components/topic-proposal/topic-proposal.component';
import { TopicDenunciationComponent } from './components/topic-denunciation/topic-denunciation.component';
import { PaymentRegistrationComponent } from './components/payment-registration/payment-registration.component';
import { TopicNotificationListComponent } from './components/topic-notification/topic-notification-list/topic-notification-list.component';
import { TopicNotificationReadComponent } from './components/topic-notification/topic-notification-read/topic-notification-read.component';
import { TopicDenunciationReadComponent } from './components/topic-denunciation/topic-denunciation-read/topic-denunciation-read.component';
import { GuardsService as guard } from './services/guards.service';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: TopicBanckComponent, canActivate: [guard], data: {expectedRol: ['STUDENT', 'CAREER_DIRECTOR', 'AUTHORITY']},
      },
      {
        path: TopicDenunciationComponent.END_POINT,
        component: TopicDenunciationComponent, canActivate: [guard], data: {expectedRol: ['STUDENT']}
      },
      {
        path: TopicDenunciationReadComponent.END_POINT,
        component: TopicDenunciationReadComponent, canActivate: [guard], data: {expectedRol: ['STUDENT', 'CAREER_DIRECTOR','AUTHORITY']}
      },
      {
        path: TopicNotificationReadComponent.END_POINT,
        component: TopicNotificationReadComponent, canActivate: [guard], data: {expectedRol: ['STUDENT', 'CAREER_DIRECTOR','AUTHORITY']}
      },
      {
        path: TopicNotificationListComponent.END_POINT,
        component: TopicNotificationListComponent, canActivate: [guard], data: {expectedRol: ['CAREER_DIRECTOR']}
      },
      {
        path: TopicNotificationComponent.END_POINT,
        component: TopicNotificationComponent, canActivate: [guard], data: {expectedRol: ['CAREER_DIRECTOR']}
      },
      {
        path: TopicProposalComponent.END_POINT,
        component: TopicProposalComponent, canActivate: [guard], data: {expectedRol: ['STUDENT']}
      },
      {
        path: TopicProposalReadComponent.END_POINT,
        component: TopicProposalReadComponent, canActivate: [guard], data: {expectedRol: ['STUDENT', 'CAREER_DIRECTOR','AUTHORITY']}
      },
      {
        path: ProfileComponent.END_POINT,
        component: ProfileComponent, canActivate: [guard], data: {expectedRol: ['STUDENT', 'CAREER_DIRECTOR', 'AUTHORITY', 'FINANCIAL']}
      },
      {
        path: PaymentRegistrationComponent.END_POINT,
        component: PaymentRegistrationComponent, canActivate: [guard], data: {expectedRol: ['FINANCIAL']}
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
