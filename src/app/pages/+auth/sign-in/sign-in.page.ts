import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login/entities/social-user';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { AuthBackendService } from '@core/services/auth-backend.service';
import { NotificationService } from '@core/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit, OnDestroy {
  public loggedIn: boolean;
  private authState: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: SocialAuthService,
    private authBackendService: AuthBackendService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.authState = this.authService.authState.subscribe(
      (user: SocialUser) => {
        if (!user) {
          this.loggedIn = false;
          return;
        }
        this.loggedIn = true;
        if (user.provider === 'GOOGLE') {
          this.authBackendService.google(user.authToken).subscribe(() => {
            this.handleAfterLogin();
          });
        } else {
          this.authBackendService.facebook(user.authToken).subscribe(() => {
            this.handleAfterLogin();
          });
        }
      },
    );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, {
      ux_mode: 'redirect',
    });
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  private handleAfterLogin() {
    this.notificationService.success(`Bạn đã đăng nhập thành công!`);

    const redirectUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ?? '/';

    this.router.navigateByUrl(redirectUrl);
  }

  ngOnDestroy(): void {
    this.authState.unsubscribe();
  }
}
