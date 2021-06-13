import { BaseHttpClientService } from '@core/services/base-http-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ContestModel } from '@core/models/contest.model';
import { ICollection } from '@core/interfaces/collection.interface';
import { SubjectModel } from '@core/models/subject.model';
import { PartModel } from '@core/models/part.model';

@Injectable({
  providedIn: 'root',
})
export class ContestService extends BaseHttpClientService {
  getEntityPath(): string {
    return 'contests';
  }

  index(): Observable<Array<ContestModel>> {
    return this.get(this.getUrl()).pipe(
      map((res: ICollection) => res.data),
      map((data) => data.map((contest) => new ContestModel(contest))),
    );
  }

  getSubjects(id: number): Observable<Array<SubjectModel>> {
    const url = this.getUrl() + `/${id}/subjects`;

    return this.get(url).pipe(
      map((res: ICollection) => res.data),
      map((data) => data.map((subject) => new SubjectModel(subject))),
    );
  }

  getParts(id: number): Observable<Array<PartModel>> {
    const url = this.getUrl() + `/${id}/parts`;

    return this.get(url).pipe(
      map((res: ICollection) => res.data),
      map((data) => data.map((part) => new PartModel(part))),
    );
  }

  getById(id: number): Observable<ContestModel> {
    const url = this.getUrl() + `/${id}`;

    return this.get(url).pipe(map((res: any) => new ContestModel(res.data)));
  }
}
