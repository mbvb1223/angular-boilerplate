import { BaseModel } from './base.model';

export class ExamModel extends BaseModel {
  title: string;
  time: number;
  description: string;
  status: number;
  type: number;
  subject_id: number;
}
