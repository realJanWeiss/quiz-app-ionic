import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoteQuizzesPageRoutingModule } from './remote-quizzes-routing.module';

import { RemoteQuizzesPage } from './remote-quizzes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoteQuizzesPageRoutingModule
  ],
  declarations: [RemoteQuizzesPage]
})
export class RemoteQuizzesPageModule {}
