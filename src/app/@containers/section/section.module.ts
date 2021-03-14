import { NgModule } from '@angular/core';

import { SectionRoutingModule } from './section-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { QuestionListComponent } from '@containers/section/question-list/question-list.component';
import { QuestionItemComponent } from '@containers/section/question-item/question-item.component';
import { QuestionGroupComponent } from '@containers/section/question-group/question-group.component';

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionItemComponent,
    QuestionGroupComponent,
  ],
  imports: [SharedModule, SectionRoutingModule],
})
export class SectionModule {}
