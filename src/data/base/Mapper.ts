export interface Mapper<From, To> {
  map(from: From): To;
}


export function mapAll<From, To>(
  mapper: Mapper<From, To>,
  items: From[]
): To[] {
  return items.map(item => mapper.map(item));
}
