import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { TestRoutingModule } from './test-routing.module';
import { TestListComponent } from '@containers/test/test-list/test-list.component';

@NgModule({
  declarations: [TestListComponent],
  imports: [SharedModule, TestRoutingModule],
})
export class TestModule {}
