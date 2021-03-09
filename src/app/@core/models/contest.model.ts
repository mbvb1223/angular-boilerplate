import { BaseModel } from './base.model';

export class ContestModel extends BaseModel {
  static readonly STATUS_ACTIVE = 1;
  static readonly STATUS_INACTIVE = 2;

  title: string;
  status: number;
  description: string;
  price: number;
  sale_price: number;

  get isFree(): boolean {
    return !this.sale_price;
  }

  get isActive(): boolean {
    return this.status === ContestModel.STATUS_ACTIVE;
  }
}
