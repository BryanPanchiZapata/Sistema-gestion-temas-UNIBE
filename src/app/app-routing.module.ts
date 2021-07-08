import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { TopicBanckComponent } from './components/topic-banck/topic-banck.component';
import { TopicNotificationComponent } from './components/topic-notification/topic-notification.component';
import {LoginComponent} from "./components/auth/login.component";
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
        path: ProfileComponent.END_POINT,
        component: ProfileComponent,
      },
      {
        path: TopicProposalComponent.END_POINT,
        component: TopicProposalComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
