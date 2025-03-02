import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoteQuizzesPage } from './remote-quizzes.page';

const routes: Routes = [
  {
    path: '',
    component: RemoteQuizzesPage,
  },
  {
    path: ':id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoteQuizzesPageRoutingModule {}
