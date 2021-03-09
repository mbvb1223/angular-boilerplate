import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContestListComponent } from '@containers/contest/contest-list/contest-list.component';
import { SubjectListComponent } from '@containers/contest/subject-list/subject-list.component';

const routes: Routes = [
  {
    path: '',
    component: ContestListComponent
  },
  {
    path: ':id/subjects',
    component: SubjectListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestRoutingModule {}
