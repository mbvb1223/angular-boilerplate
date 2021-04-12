import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {QuestionListComponent} from '@app/containers/question/question-list/question-list.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule {}
