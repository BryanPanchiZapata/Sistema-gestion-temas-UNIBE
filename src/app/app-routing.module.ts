import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { TopicBanckComponent } from './components/topic-banck/topic-banck.component';
import { TopicNotificationComponent } from './components/topic-notification/topic-notification.component';
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {TopicProposalComponent} from "./components/topic-proposal/topic-proposal.component";
import {TopicDenunciationComponent} from "./components/topic-denunciation/topic-denunciation.component";

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children:[
      {
        path: '',
        component: TopicBanckComponent,
      },
      {
        path: TopicDenunciationComponent.END_POINT,
        component: TopicDenunciationComponent,
      },
      {
        path: TopicNotificationComponent.END_POINT,
        component: TopicNotificationComponent,
      },
      {
        path: TopicProposalComponent.END_POINT,
        component: ProfileComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
