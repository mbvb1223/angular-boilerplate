import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { AuthBackendService } from '@core/services/auth-backend.service';
import { NotificationService } from '@core/services/notification.service';
import { Path } from '@core/structs';

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

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      if (user.provider === 'GOOGLE') {
        this.authBackendService.google(user.authToken).subscribe(() => {
          this.handleAfterLogin();
        });
      } else {
        this.authBackendService.facebook(user.authToken).subscribe(() => {
          this.handleAfterLogin();
        });
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  private handleAfterLogin() {
    this.notificationService.success(`Bạn đã đăng nhập thành công!`);

    const redirectUrl =
      this.activatedRoute.snapshot.queryParamMap.get('redirect') ??
      Path.Contest;

    this.router.navigateByUrl(redirectUrl);
  }
}
