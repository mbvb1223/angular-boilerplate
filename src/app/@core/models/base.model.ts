import { includes } from 'lodash';

export class BaseModel {
  id: number;

  constructor(params?: object) {
    if (!params) {
      return;
    }

    for (const key of Object.keys(params)) {
      if (includes(this.numberFields(), key)) {
        this[key] = +params[key] || 0;
      } else {
        (<any>this)[key] = params[key];
      }
    }
  }

  /**
   * @returns {Array<string>}
   */
  protected numberFields(): Array<string> {
    return [];
  }
}
