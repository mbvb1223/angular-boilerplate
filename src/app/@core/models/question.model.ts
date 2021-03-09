import { BaseModel } from './base.model';

export class QuestionModel extends BaseModel {
  title: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  correct_answer: number;
  description: string;
}
