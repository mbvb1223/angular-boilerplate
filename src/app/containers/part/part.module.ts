import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { PartRoutingModule } from './part-routing.module';
import { OrderModule } from '@components/order/order.module';
import { PostModule } from '@app/containers/post/post.module';
import { PartListComponent } from '@app/containers/part/part-list/part-list.component';

@NgModule({
  declarations: [PartListComponent],
  imports: [SharedModule, PartRoutingModule, OrderModule, PostModule],
})
export class PartModule {}
