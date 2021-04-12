import { BaseModel } from './base.model';

export class UserExamModel extends BaseModel {
  user_id: string;
  exam_id: number;
  answer: string;
}
