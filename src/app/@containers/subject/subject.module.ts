import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { SubjectRoutingModule } from './subject-routing.module';
import { SectionListComponent } from '@containers/subject/section-list/section-list.component';

@NgModule({
  declarations: [SectionListComponent],
  imports: [SharedModule, SubjectRoutingModule],
})
export class SubjectModule {}
