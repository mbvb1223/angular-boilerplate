import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderComponent } from '@components/order/order.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    OrderComponent
  ]
})
export class OrderModule {
}
