import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamListComponent } from '@containers/exam/exam-list/exam-list.component';
import { ExamItemComponent } from '@containers/exam/exam-item/exam-item.component';
import { SectionModule } from '@containers/section/section.module';
import { ExamItemResultComponent } from '@containers/exam/exam-item-result/exam-item-result.component';

@NgModule({
  declarations: [ExamListComponent, ExamItemComponent, ExamItemResultComponent],
  imports: [SharedModule, ExamRoutingModule, SectionModule],
})
export class ExamModule {}
