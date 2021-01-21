import { BaseModel } from './base.model';

export class ContestModel extends BaseModel {
  static readonly STATUS_ACTIVE = 1;
  static readonly STATUS_INACTIVE = 2;

  title: string;
  description: string;
  price: number;
  sale_price: number;
}
