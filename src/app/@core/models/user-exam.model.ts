import { BaseModel } from './base.model';
import { formatDate } from '@angular/common';

export class UserExamModel extends BaseModel {
  user_id: string;
  exam_id: number;
  answer: string;
  number_correct: number;
  number_question: number;
  created_at: string;

  get formattedCreatedAt(): string {
    return formatDate(this.created_at, 'H:mm dd/MM/yyyy', 'en-US');
  }
}
