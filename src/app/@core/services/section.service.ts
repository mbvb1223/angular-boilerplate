import { BaseHttpClientService } from '@core/services/base-http-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ICollection } from '@core/interfaces/collection.interface';
import { QuestionModel } from '@core/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService extends BaseHttpClientService {
  getEntityPath(): string {
    return 'sections';
  }

  paginateQuestions(id: number, currentPage: number = 1, pageSize: number = 10): Observable<any> {
    const url = this.getUrl() + `/${id}/questions?page=${currentPage}&page_size=${pageSize}`;

    return this.get(url).pipe(
      map((res: ICollection) => {
         return {
           meta: res.meta,
           data: res.data.map(question => new QuestionModel(question))
         }
      })
    );
  }
}
