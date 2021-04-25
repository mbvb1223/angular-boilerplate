import { BaseModel } from './base.model';

export class PostModel extends BaseModel {
  static readonly STATUS_ACTIVE = 1;
  static readonly STATUS_INACTIVE = 2;
  static readonly TYPE_COMMON = 1;
  static readonly TYPE_CONTEST = 2;
  static readonly TYPE_SUBJECT = 3;

  title: string;
  status: number;
  order: number;
  type_id: number;
  vip: number;
  image: string;
  short_content: string;
  content: string;
  creatable_type: string;
  creatable_id: number;

  get isActive(): boolean {
    return this.status === PostModel.STATUS_ACTIVE;
  }

  get isVip() {
    return this.vip === 1;
  }
}
