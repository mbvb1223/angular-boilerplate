import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionListComponent } from '@containers/section/question-list/question-list.component';

const routes: Routes = [
  {
    path: ':id/questions',
    component: QuestionListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionRoutingModule {}
