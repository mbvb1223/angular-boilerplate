import { BaseModel } from './base.model';

export class PartModel extends BaseModel {
  title: string;
  description: string;
  children: Array<PartModel>;
  audio: string;
  video: string;
}
