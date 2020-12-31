import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '@core/structs';

import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  returnUrl: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: SocialAuthService
  ) {
    // this.returnUrl =
    //   this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
    //   `/${Path.App}/${Path.Dashboard}`;
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      console.log('user__', user)
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
