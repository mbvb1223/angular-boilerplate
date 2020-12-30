import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { MaterialConfigurationModule } from './material-configuration/material-configuration.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    LoadingScreenComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ],
  exports: [
    SearchComponent,
    LoadingScreenComponent,
    MaterialConfigurationModule,
    CommonModule
  ]
})
export class SharedModule {
}
