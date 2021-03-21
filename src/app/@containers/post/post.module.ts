import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { PostListComponent } from '@containers/post/post-list.component';
import { PostItemComponent } from '@containers/post/post-item.component';
import { PostRoutingModule } from '@containers/post/post-routing.module';

@NgModule({
  declarations: [PostListComponent, PostItemComponent],
  imports: [CommonModule, PostRoutingModule, SharedModule],
  exports: [PostListComponent],
})
export class PostModule {}
