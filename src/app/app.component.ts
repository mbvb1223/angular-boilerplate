import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SeoService } from '@core/services/seo';
import { Path } from '@core/structs';
import { LoadingScreenComponent } from '@app/shared/loading-screen/loading-screen.component';
import { AuthBackendService } from '@core/services/auth-backend.service';
import { UserModel } from '@core/models/user.model';
import { AuthService } from '@pages/public/auth/_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('appMainSpinner', { static: true })
  loadingScreenComponent: LoadingScreenComponent;
  userSubject$: Observable<UserModel | null>;

  constructor(
    private router: Router,
    private seoService: SeoService,
    private authService: AuthService,
    private backendAuthService: AuthBackendService,
  ) {}

  ngOnInit(): void {
    this.seoService.init();
    this.userSubject$ = this.backendAuthService.userSubject$;
  }

  onLogout(): void {
    this.authService.signOut();
    this.router.navigate([`/${Path.SignIn}`]);
  }
}
