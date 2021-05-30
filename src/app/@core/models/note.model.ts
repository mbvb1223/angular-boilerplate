import { BaseModel } from './base.model';
import { formatDate } from '@angular/common';

export class NoteModel extends BaseModel {
  content: string;
  creatable_type: string;
  creatable_id: number;
  created_at: string;

  get formattedCreatedAt(): string {
    return formatDate(this.created_at, 'dd/MM/yyyy H:mm', 'en-US');
  }
}
