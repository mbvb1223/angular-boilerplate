import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, RouterModule],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
