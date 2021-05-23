import { BaseHttpClientService } from '@core/services/base-http-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ICollection } from '@core/interfaces/collection.interface';
import { ExamModel } from '@core/models/exam.model';
import { UserExamModel } from '@core/models/user-exam.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService extends BaseHttpClientService {
  getEntityPath(): string {
    return 'exams';
  }

  index(): Observable<Array<ExamModel>> {
    return this.get(this.getUrl()).pipe(
      map((res: ICollection) => res.data),
      map((data) => data.map((exam) => new ExamModel(exam))),
    );
  }

  getById(id: number): Observable<ExamModel> {
    const url = this.getUrl() + `/${id}`;

    return this.get(url).pipe(map((res) => new ExamModel(res.data)));
  }

  getResult(id: number, resultId: number): Observable<UserExamModel> {
    const url = this.getUrl() + `/${id}` + '/result/' + resultId;

    return this.get(url).pipe(map((res) => new UserExamModel(res.data)));
  }

  submit(examId: number, data: any): Observable<any> {
    const url = this.getUrl() + `/${examId}`;

    return this.post(url, data).pipe(map((res: ICollection) => res.data));
  }
}
