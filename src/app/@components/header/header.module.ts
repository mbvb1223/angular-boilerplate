import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemePanelModule } from '../theme-panel/theme-panel.module';
import { HeaderComponent } from './header.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, RouterModule, ThemePanelModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
