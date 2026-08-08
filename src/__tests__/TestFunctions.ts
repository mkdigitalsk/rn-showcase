interface TestSpec<T, R> {
  given?: () => void;
  whenAction: () => R;
  then?: (result: T) => void | Promise<void>;
}

// Overloaded so only a genuinely async action returns a promise the caller has to hand back.
export function test<T>(spec: TestSpec<T, Promise<T>>): Promise<void>;
export function test<T>(spec: TestSpec<T, T>): void;
export function test<T>({ given = () => {}, whenAction, then = () => {} }: TestSpec<T, T | Promise<T>>): void | Promise<void> {
  given();
  const result = whenAction();
  if (result instanceof Promise) {
    return result.then(resolved => then(resolved));
  }
  return then(result);
}
