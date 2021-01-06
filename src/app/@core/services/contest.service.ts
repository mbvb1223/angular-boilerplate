import { BaseHttpClientService } from '@core/services/base-http-client.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContestService extends BaseHttpClientService {
  getEntityPath(): string {
    return 'sdfsdf';
  }

  getA(): Observable<Object>  {
    return this.httpClient.get('https://mo-backend.herokuapp.com/api/contests');
  }
}
