import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContestListComponent } from '@app/containers/contest/contest-list/contest-list.component';
import { SubjectListComponent } from '@app/containers/contest/subject-list/subject-list.component';

const routes: Routes = [
  {
    path: '',
    component: ContestListComponent,
  },
  {
    path: ':ky-thi',
    component: SubjectListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestRoutingModule {}
