import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login/entities/social-user';
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
  ) {}

  ngOnInit(): void {}

  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this.authBackendService.google(user.authToken).subscribe(() => {
          this.handleAfterLogin();
        });
      });
  }

  signInWithFacebook(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this.authBackendService.facebook(user.authToken).subscribe(() => {
          this.handleAfterLogin();
        });
      });
  }

  private handleAfterLogin() {
    this.notificationService.success(`Bạn đã đăng nhập thành công!`);

    const redirectUrl = this.activatedRoute.snapshot.queryParamMap.get(
      'returnUrl',
    )
      ? String(this.activatedRoute.snapshot.queryParamMap.get('returnUrl'))
      : '/';

    this.router.navigateByUrl(redirectUrl);
  }
}
