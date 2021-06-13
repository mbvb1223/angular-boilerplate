import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoadingScreenComponent } from '@app/shared/loading-screen/loading-screen.component';
import { MaterialConfigurationModule } from '@app/shared/material-configuration/material-configuration.module';
import { SearchComponent } from '@app/shared/search/search.component';
import { DialogComponent } from '@app/shared/dialog/dialog.component';

@NgModule({
  declarations: [DialogComponent, LoadingScreenComponent, SearchComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialConfigurationModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchComponent,
    LoadingScreenComponent,
    MaterialConfigurationModule,
  ],
})
export class SharedModule {}
