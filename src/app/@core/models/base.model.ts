export class BaseModel {
  id: number;

  constructor(params?: Array<unknown>) {
    if (!params) {
      return;
    }
    for (const key of Object.keys(params)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (<never>this)[key] = params[key];
    }
  }
}
