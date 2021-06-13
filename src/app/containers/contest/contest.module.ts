import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ContestRoutingModule } from './contest-routing.module';
import { ContestListComponent } from '@app/containers/contest/contest-list/contest-list.component';
import { SubjectListComponent } from '@app/containers/contest/subject-list/subject-list.component';
import { OrderModule } from '@components/order/order.module';
import { PostModule } from '@app/containers/post/post.module';

@NgModule({
  declarations: [ContestListComponent, SubjectListComponent],
  imports: [SharedModule, ContestRoutingModule, OrderModule, PostModule],
})
export class ContestModule {}
