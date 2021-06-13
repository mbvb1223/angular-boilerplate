import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { PostListComponent } from '@app/containers/post/post-list.component';
import { PostItemComponent } from '@app/containers/post/post-item.component';
import { PostRoutingModule } from '@app/containers/post/post-routing.module';
import { OrderModule } from '@components/order/order.module';

@NgModule({
  declarations: [PostListComponent, PostItemComponent],
  imports: [CommonModule, PostRoutingModule, SharedModule, OrderModule],
  exports: [PostListComponent],
})
export class PostModule {}
