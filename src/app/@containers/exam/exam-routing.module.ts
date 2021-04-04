import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamListComponent } from '@containers/exam/exam-list/exam-list.component';
import { ExamItemComponent } from '@containers/exam/exam-item/exam-item.component';
import { ExamItemResultComponent } from '@containers/exam/exam-item-result/exam-item-result.component';

const routes: Routes = [
  {
    path: '',
    component: ExamListComponent,
  },
  {
    path: ':de-thi',
    component: ExamItemComponent,
  },
  {
    path: ':de-thi/result/:result-id',
    component: ExamItemResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
