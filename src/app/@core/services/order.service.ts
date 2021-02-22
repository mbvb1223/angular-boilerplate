import { BaseHttpClientService } from '@core/services/base-http-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ICollection } from '@core/interfaces/collection.interface';
import { OrderModel } from '@core/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseHttpClientService {
  getEntityPath(): string {
    return 'orders';
  }

  create(contestId: number, data: any): Observable<any> {
    const url = this.getUrl() + `/${contestId}`;

    return this.post(url, data).pipe(
      map((res: ICollection) => res.data),
      map(data => data.map(subject => console.log(subject)))
    );
  }

  index(): Observable<Array<OrderModel>> {
    return this.get(this.getUrl()).pipe(
      map((res: ICollection) => res.data),
      map(data => data.map(order => new OrderModel(order)))
    );
  }
}
