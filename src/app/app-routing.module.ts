import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { TopicBanckComponent } from './components/topic-banck/topic-banck.component';
import { TopicNotificationComponent } from './components/topic-notification/topic-notification.component';

const routes: Routes = [
  {
    path: '',
    component: TopicBanckComponent,
  },
  {
    path: 'banco-de-temas',
    component: TopicBanckComponent,
  },
  {
    path: 'notificación-de-aprobación-de-tema',
    component: TopicNotificationComponent,
  },
  {
    path: 'perfil',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
