import { BaseHttpClientService } from '@core/services/base-http-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ICollection } from '@core/interfaces/collection.interface';
import { PostModel } from '@core/models/post.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService extends BaseHttpClientService {
  getEntityPath(): string {
    return 'posts';
  }

  index(params?: HttpParams): Observable<Array<PostModel>> {
    return this.get(this.getUrl(), true, { params: params }).pipe(
      map((res: ICollection) => res.data),
      map((data) => data.map((post) => new PostModel(post))),
    );
  }

  getById(id: number): Observable<PostModel> {
    const url = this.getUrl() + `/${id}`;

    return this.get(url).pipe(map((res: any) => new PostModel(res.data)));
  }
}
