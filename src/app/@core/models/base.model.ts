export class BaseModel {
  id: number;

  constructor(params?: Array<unknown>) {
    if (!params) {
      return;
    }
    for (const key of Object.keys(params)) {
      // @ts-ignore
      (<any>this)[key] = params[key];
    }
  }
}
