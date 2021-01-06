import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContestListComponent } from '@containers/contest/contest-list/contest-list.component';

const routes: Routes = [
  {
    path: '',
    component: ContestListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestRoutingModule {}
