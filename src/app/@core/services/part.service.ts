import { BaseHttpClientService } from '@core/services/base-http-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { NoteModel } from '@core/models/note.model';
import { ICollection } from '@core/interfaces/collection.interface';
import { CommentModel } from '@core/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class PartService extends BaseHttpClientService {
  getEntityPath(): string {
    return 'parts';
  }

  getNotesByPartId(id: number): Observable<Array<NoteModel>> {
    const url = this.getUrl() + `/${id}/notes`;

    return this.get(url).pipe(
      map((res: ICollection) => res.data),
      map((data) => data.map((note) => new NoteModel(note))),
    );
  }

  submitNote(id: number, data: any): Observable<NoteModel> {
    const url = this.getUrl() + `/${id}/notes`;

    return this.post(url, data).pipe(map((res: any) => res.data));
  }

  getCommentsByPartId(id: number): Observable<Array<CommentModel>> {
    const url = this.getUrl() + `/${id}/comments`;

    return this.get(url).pipe(
      map((res: ICollection) => res.data),
      map((data) => data.map((comment) => new CommentModel(comment))),
    );
  }

  submitComment(id: number, data: any): Observable<CommentModel> {
    const url = this.getUrl() + `/${id}/comments`;

    return this.post(url, data).pipe(map((res: any) => res.data));
  }
}
