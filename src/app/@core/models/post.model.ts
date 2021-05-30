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
  link_vip_1: string;
  link_vip_1_title: string;
  link_vip_2: string;
  link_vip_2_title: string;
  link_vip_3: string;
  link_vip_3_title: string;

  get isActive(): boolean {
    return this.status === PostModel.STATUS_ACTIVE;
  }

  get isVip(): boolean {
    return this.vip === 1;
  }

  get isCommon(): boolean {
    return this.type_id === 1;
  }

  get isContest(): boolean {
    return this.type_id === 2;
  }

  get isSubject(): boolean {
    return this.type_id === 3;
  }
}
