import { BaseHttpClientService } from '@core/services/base-http-client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

import { ContestModel } from '@core/models/contest.model';
import { ICollection } from '@core/interfaces/collection.interface';
import { UserModel } from '@core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { getItem, StorageItem } from '@core/utils';
import { AuthService } from '@app/+auth/services/auth.service';
import { SocialAuthService } from 'angularx-social-login';
import { NotificationService } from '@core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthBackendService extends BaseHttpClientService {
  userSubject$ = new BehaviorSubject<UserModel | null>(this.getCurrentUser());

  private tokenKey = 'NX)f$XhV8$;(9X;';
  private userKey = 'R_!2>k,E%4+Ve~._';

  constructor(
    protected httpClient: HttpClient,
    protected socialAuthService: SocialAuthService,
    protected notificationService: NotificationService,
  ) {
    super(httpClient);

    this.userSubject$.next(this.getCurrentUser());
  }

  getEntityPath(): string {
    return 'auth';
  }

  index(): Observable<Array<ContestModel>> {
    return this.get(this.getUrl()).pipe(
      map((res: ICollection) => res.data),
      map((data) => data.map((contest) => new ContestModel(contest))),
    );
  }

  google(authToken: string): Observable<any> {
    const url = this.getUrl() + `/google`;
    return this.post(url, { auth_token: authToken }).pipe(
      tap((result) => this.handleAfterLogin(result)),
    );
  }

  facebook(authToken: string): Observable<any> {
    const url = this.getUrl() + `/facebook`;
    return this.post(url, { auth_token: authToken }).pipe(
      tap((result) => this.handleAfterLogin(result)),
    );
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? '';
  }

  isInvalidToken(): boolean {
    return jwtHelper.isTokenExpired(this.getToken());
  }

  getCurrentUser(): UserModel | null {
    if (this.isInvalidToken() || !localStorage.getItem(this.userKey)) {
      return null;
    }

    return new UserModel(
      JSON.parse(localStorage.getItem(this.userKey) ?? '{}'),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);

    this.socialAuthService.signOut(true).finally(() => {
      this.notificationService.warning(`Bạn đã đăng xuất!`);
    });
    this.userSubject$.next(this.getCurrentUser());
  }

  private handleAfterLogin(result: any) {
    localStorage.setItem(this.tokenKey, result.data.token);
    localStorage.setItem(this.userKey, JSON.stringify(result.data.user));
    this.userSubject$.next(this.getCurrentUser());
  }
}
