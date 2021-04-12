import { BaseModel } from './base.model';

export class QuestionModel extends BaseModel {
  TYPE_SINGLE = 1;
  TYPE_PARENT = 2;
  TYPE_CHILD = 3;

  title: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  correct_answer: number;
  description: string;
  type: number;
  children: Array<QuestionModel>;

  get isSingle(): boolean {
    return this.type === this.TYPE_SINGLE;
  }

  get isParent(): boolean {
    return this.type === this.TYPE_PARENT;
  }
}
