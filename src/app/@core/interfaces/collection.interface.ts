export interface ICollection {
  data: Array<any>,
  links: any,
  meta: {
    current_page: number,
    from: number,
    last_page: number,
    links: any,
    path: any,
    per_page: number
    to: number
    total: number
  }
}
