import { BaseHttpClientService } from '@core/services/base-http-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ContestModel } from '@core/models/contest.model';
import { ICollection } from '@core/interfaces/collection.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthBackendService extends BaseHttpClientService {
  getEntityPath(): string {
    return 'auth';
  }

  index(): Observable<Array<ContestModel>> {
    return this.get(this.getUrl()).pipe(
      map((res: ICollection) => res.data),
      map(data => data.map(contest => new ContestModel(contest)))
    );
  }

  google(authToken: string): Observable<any> {
    const url = this.getUrl() + `/google`;
    console.log(url);
    return this.post(url, { auth_token: authToken });
  }
}
