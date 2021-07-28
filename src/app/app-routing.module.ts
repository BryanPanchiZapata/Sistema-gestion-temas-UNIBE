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

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: TopicBanckComponent,
      },
      {
        path: TopicDenunciationComponent.END_POINT,
        component: TopicDenunciationComponent,
      },
      {
        path: TopicDenunciationReadComponent.END_POINT,
        component: TopicDenunciationReadComponent,
      },
      {
        path: TopicNotificationReadComponent.END_POINT,
        component: TopicNotificationReadComponent,
      },
      {
        path: TopicNotificationListComponent.END_POINT,
        component: TopicNotificationListComponent,
      },
      {
        path: TopicNotificationComponent.END_POINT,
        component: TopicNotificationComponent,
      },
      {
        path: TopicProposalComponent.END_POINT,
        component: TopicProposalComponent,
      },
      {
        path: ProfileComponent.END_POINT,
        component: ProfileComponent,
      },
      {
        path: PaymentRegistrationComponent.END_POINT,
        component: PaymentRegistrationComponent,
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
