import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestListComponent } from '@containers/test/test-list/test-list.component';

const routes: Routes = [
  {
    path: '',
    component: TestListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {}
