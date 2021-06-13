import { NgModule } from '@angular/core';

import { SectionRoutingModule } from './section-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { QuestionListComponent } from '@app/containers/section/question-list/question-list.component';
import { QuestionItemComponent } from '@app/containers/section/question-item/question-item.component';
import { QuestionGroupComponent } from '@app/containers/section/question-group/question-group.component';
import { OrderModule } from '@components/order/order.module';

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionItemComponent,
    QuestionGroupComponent,
  ],
  imports: [SharedModule, SectionRoutingModule, OrderModule],
  exports: [
    QuestionItemComponent,
    QuestionGroupComponent
  ]
})
export class SectionModule {}
