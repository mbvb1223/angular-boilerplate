import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
