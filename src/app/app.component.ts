import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './+auth/services/auth.service';
import { SeoService } from '@core/services/seo';
import { Path } from '@core/structs';
import { LoadingScreenComponent } from '@app/shared/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  @ViewChild('appMainSpinner', { static: true }) loadingScreenComponent: LoadingScreenComponent;

  constructor(
    private router: Router,
    private seoService: SeoService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.seoService.init();
  }

  onLogout(): void {
    this.authService.signOut();
    this.router.navigate([`/${Path.SignIn}`]);
  }
}
