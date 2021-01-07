import { BaseHttpClientService } from '@core/services/base-http-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ICollection } from '@core/interfaces/collection.interface';
import { SectionModel } from '@core/models/section.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends BaseHttpClientService {
  getEntityPath(): string {
    return 'subjects';
  }

  getSections(id: number): Observable<Array<SectionModel>> {
    const url = this.getUrl() + `/${id}/sections`;

    return this.get(url).pipe(
      map((res: ICollection) => res.data),
      map(data => data.map(section => new SectionModel(section)))
    );
  }
}
