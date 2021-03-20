import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { PostComponent } from '@components/post/post.component';

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, SharedModule],
  exports: [PostComponent],
})
export class PostModule {}
