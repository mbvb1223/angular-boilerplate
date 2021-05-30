import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignInPage } from './sign-in.page';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SignInPage],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignInPage,
        data: {
          title: 'Đăng nhập',
          description:
            'Đăng nhập hệ thống ThiCongChuc.Org',
          robots: 'index, follow',
        },
      },
    ]),
  ],
})
export class SignInModule {}
