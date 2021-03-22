import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamListComponent } from '@containers/exam/exam-list/exam-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExamListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
