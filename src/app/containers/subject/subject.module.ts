import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectDetailComponent } from '@app/containers/subject/subject-detail/subject-detail.component';
import { PostModule } from '@app/containers/post/post.module';
import { OrderModule } from '@components/order/order.module';

@NgModule({
  declarations: [SubjectDetailComponent],
  imports: [SharedModule, SubjectRoutingModule, PostModule, OrderModule],
})
export class SubjectModule {}
