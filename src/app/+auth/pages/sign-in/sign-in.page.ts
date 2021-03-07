import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { AuthBackendService } from '@core/services/auth-backend.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: SocialAuthService,
    private authBackendService: AuthBackendService,
    private notificationService: NotificationService,
  ) {
    // this.returnUrl =
    //   this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
    //   `/${Path.App}/${Path.Dashboard}`;
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.authBackendService.google(user.authToken).subscribe((result) => {
        this.notificationService.success(`Bạn đã đăng nhập thành công!`);

        const redirectUrl = this.activatedRoute.snapshot.queryParamMap.get(
          'redirect',
        );
        if (redirectUrl) {
          this.router.navigateByUrl(redirectUrl);
        }
      });
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
