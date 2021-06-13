import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartListComponent } from '@app/containers/part/part-list/part-list.component';

const routes: Routes = [
  {
    path: ':part',
    component: PartListComponent,
    data: {
      robots: 'index, follow',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartRoutingModule {}
