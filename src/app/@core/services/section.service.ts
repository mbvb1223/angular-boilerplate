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


  getQuestions(id: number): Observable<Array<QuestionModel>> {
    const url = this.getUrl() + `/${id}/questions`;

    return this.get(url).pipe(
      map((res: ICollection) => res.data),
      map(data => data.map(question => new QuestionModel(question)))
    );
  }
}
