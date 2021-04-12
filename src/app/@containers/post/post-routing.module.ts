import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostItemComponent } from '@containers/post/post-item.component';
import { PostListComponent } from '@containers/post/post-list.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: ':id',
    component: PostItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
