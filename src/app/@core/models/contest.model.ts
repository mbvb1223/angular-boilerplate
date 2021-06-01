import { BaseModel } from './base.model';
import { SubjectModel } from '@core/models/subject.model';

export class ContestModel extends BaseModel {
  static readonly STATUS_ACTIVE = 1;
  static readonly STATUS_INACTIVE = 2;

  static readonly TYPE_HAS_SUBJECT = 1;
  static readonly TYPE_HAS_SECTION = 2;
  static readonly TYPE_HAS_PART = 3;

  title: string;
  status: number;
  type: number;
  short_description: string;
  description: string;
  price: number;
  image: string;
  sale_price: number;

  subjects: Array<SubjectModel>;

  constructor(params?: Array<unknown>) {
    super(params);

    if (this.subjects) {
      this.subjects = this.subjects.map(
        (subject: any) => new SubjectModel(subject),
      );
    }
  }

  get isFree(): boolean {
    return !this.sale_price;
  }

  get isActive(): boolean {
    return this.status === ContestModel.STATUS_ACTIVE;
  }

  get isSubject(): boolean {
    return this.type === ContestModel.TYPE_HAS_SUBJECT;
  }

  get isSection(): boolean {
    return this.type === ContestModel.TYPE_HAS_SECTION;
  }

  get isPart(): boolean {
    return this.type === ContestModel.TYPE_HAS_PART;
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
