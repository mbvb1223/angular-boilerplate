import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamListComponent } from '@app/containers/exam/exam-list/exam-list.component';
import { ExamItemComponent } from '@app/containers/exam/exam-item/exam-item.component';
import { SectionModule } from '@app/containers/section/section.module';
import { ExamItemResultComponent } from '@app/containers/exam/exam-item-result/exam-item-result.component';
import { OrderModule } from '@components/order/order.module';

@NgModule({
  declarations: [ExamListComponent, ExamItemComponent, ExamItemResultComponent],
  imports: [SharedModule, ExamRoutingModule, SectionModule, OrderModule],
})
export class ExamModule {}
