import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SectionListComponent } from '@containers/subject/section-list/section-list.component';

const routes: Routes = [
  {
    path: ':id/sections',
    component: SectionListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectRoutingModule {}
