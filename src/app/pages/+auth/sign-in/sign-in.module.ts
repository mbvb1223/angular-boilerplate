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
          title: 'Sign into Angular Boilerplate',
          description:
            'Start writing your business logic right away without any concern on architecture matters.',
          robots: 'index, follow',
        },
      },
    ]),
  ],
})
export class SignInModule {}
