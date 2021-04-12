import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionListComponent } from '@app/containers/question/question-list/question-list.component';
import { QuestionItemComponent } from '@app/containers/question/question-item/question-item.component';

@NgModule({
  declarations: [QuestionListComponent, QuestionItemComponent],
  imports: [SharedModule, QuestionRoutingModule],
})
export class QuestionModule {}
