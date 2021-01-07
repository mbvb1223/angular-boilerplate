import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ContestRoutingModule } from './contest-routing.module';
import { ContestListComponent } from '@containers/contest/contest-list/contest-list.component';
import { SubjectListComponent } from '@containers/contest/subject-list/subject-list.component';

@NgModule({
  declarations: [ContestListComponent, SubjectListComponent],
  imports: [SharedModule, ContestRoutingModule],
})
export class ContestModule {}
