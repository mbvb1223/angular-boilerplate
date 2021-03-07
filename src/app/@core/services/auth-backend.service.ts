import { BaseHttpClientService } from '@core/services/base-http-client.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

import { ContestModel } from '@core/models/contest.model';
import { ICollection } from '@core/interfaces/collection.interface';
import { UserModel } from '@core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthBackendService extends BaseHttpClientService {
  private tokenKey = 'NX)f$XhV8$;(9X;';
  private userKey = 'R_!2>k,E%4+Ve~._';

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
      tap((result) => {
        localStorage.setItem(this.tokenKey, result.data.token);
        localStorage.setItem(this.userKey, JSON.stringify(result.data.user));
      }),
    );
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? '';
  }

  isInvalidToken(): boolean {
    return jwtHelper.isTokenExpired(this.getToken());
  }

  getCurrentUser(): UserModel | null {
    if (!localStorage.getItem(this.userKey)) {
      return null;
    }

    return new UserModel(
      JSON.parse(localStorage.getItem(this.userKey) ?? '{}'),
    );
  }
}
