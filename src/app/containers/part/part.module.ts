import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '@app/shared/shared.module';
import { PartRoutingModule } from '@app/containers/part/part-routing.module';
import { OrderModule } from '@components/order/order.module';
import { PostModule } from '@app/containers/post/post.module';
import { PartListComponent } from '@app/containers/part/part-list/part-list.component';
import { PartItemComponent } from '@app/containers/part/part-item/part-item.component';

@NgModule({
  declarations: [PartListComponent, PartItemComponent],
  imports: [
    SharedModule,
    PartRoutingModule,
    OrderModule,
    PostModule,
    QuillModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          // [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
          ['emoji'],
        ],
      },
    }),
  ],
})
export class PartModule {}
