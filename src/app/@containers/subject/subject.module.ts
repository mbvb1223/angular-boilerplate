import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectDetailComponent } from '@containers/subject/subject-detail/subject-detail.component';

@NgModule({
  declarations: [SubjectDetailComponent],
  imports: [SharedModule, SubjectRoutingModule],
})
export class SubjectModule {}
