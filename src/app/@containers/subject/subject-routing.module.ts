import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubjectDetailComponent } from '@containers/subject/subject-detail/subject-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: SubjectDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectRoutingModule {}
