import { BaseModel } from './base.model';

export class OrderModel extends BaseModel {
  static readonly STATUS_ACTIVE = 1;
  static readonly STATUS_INACTIVE = 2;

  contest_id: number;
  user_id: number;
  note: string;
  status: number;
}
