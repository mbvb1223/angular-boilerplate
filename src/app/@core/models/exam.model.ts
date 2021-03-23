import { BaseModel } from './base.model';
import { QuestionModel } from '@core/models/question.model';

export class ExamModel extends BaseModel {
  title: string;
  time: number;
  number_question: string;
  description: string;
  status: number;
  type: number;
  subject_id: number;

  questions: Array<QuestionModel>;
}
