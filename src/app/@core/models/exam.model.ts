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
  vip: number;

  questions: Array<QuestionModel>;

  constructor(params?: Array<unknown>) {
    super(params);

    if (this.questions) {
      this.questions = this.questions.map(
        (question: any) => new QuestionModel(question),
      );
    }
  }

  get isVip(): boolean {
    return this.vip === 1;
  }
}
