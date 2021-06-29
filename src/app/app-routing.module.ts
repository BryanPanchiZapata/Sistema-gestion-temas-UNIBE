import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { TopicBanckComponent } from './components/topic-banck/topic-banck.component';
import { TopicDenunciationComponent } from './components/topic-denunciation/topic-denunciation.component';
import { TopicNotificationComponent } from './components/topic-notification/topic-notification.component';
import { TopicProposalComponent } from './components/topic-proposal/topic-proposal.component';

const routes: Routes = [
  {
    path: 'topic-banck',
    component: TopicBanckComponent,
  },
  {
    path: 'topic-denunciation',
    component: TopicDenunciationComponent,
  },
  {
    path: 'topic-proposal',
    component: TopicProposalComponent,
  },
  {
    path: 'topic-notification',
    component: TopicNotificationComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
