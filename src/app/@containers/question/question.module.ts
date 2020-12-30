import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionListComponent } from '@containers/question/question-list/question-list.component';

@NgModule({
  declarations: [QuestionListComponent],
  imports: [SharedModule, QuestionRoutingModule],
})
export class QuestionModule {}
