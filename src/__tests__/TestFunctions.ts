export function test<T>({
  given = () => {},
  whenAction,
  then,
}: {
  given?: () => void;
  whenAction: () => T | Promise<T>;
  then: (result: T) => void | Promise<void>;
}): void | Promise<void> {
  given();
  const result = whenAction();
  if (result instanceof Promise) {
    return result.then((resolved) => then(resolved));
  }
  return then(result as T);
}
