import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { SectionRoutingModule } from './section-routing.module';
import { QuestionListComponent } from '@containers/section/question-list/question-list.component';
import { QuestionItemComponent } from '@containers/section/question-item/question-item.component';

@NgModule({
  declarations: [QuestionListComponent, QuestionItemComponent],
  imports: [SharedModule, SectionRoutingModule],
})
export class SectionModule {}
