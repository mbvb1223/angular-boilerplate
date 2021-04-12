import { BaseModel } from './base.model';

export class ContestModel extends BaseModel {
  static readonly STATUS_ACTIVE = 1;
  static readonly STATUS_INACTIVE = 2;

  title: string;
  status: number;
  description: string;
  price: number;
  image: string;
  sale_price: number;

  get isFree(): boolean {
    return !this.sale_price;
  }

  get isActive(): boolean {
    return this.status === ContestModel.STATUS_ACTIVE;
  }

  get formatted_sale_price(): string {
    return this.sale_price.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
  }

  get formatted_price(): string {
    return this.price.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
  }
}
