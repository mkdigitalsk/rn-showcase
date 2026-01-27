/**
 * Base class for one-shot async operations.
 * For no-params use cases, use UseCase<void, Result>
 */
export abstract class UseCase<Params, Result> {
  protected abstract run(params: Params): Promise<Result>;

  async execute(...args: Params extends void ? [] : [Params]): Promise<Result> {
    const params = (args[0] ?? undefined) as Params;
    return this.run(params);
  }
}

/**
 * Subscription handle returned by FlowUseCase
 */
export interface Subscription {
  unsubscribe(): void;
}

/**
 * Base class for reactive/observable operations.
 * Returns a stream of values over time.
 */
export abstract class FlowUseCase<Params, Result> {
  protected abstract doExecute(
    params: Params,
    emit: (value: Result) => void,
    onError: (error: Error) => void
  ): Subscription | (() => void);

  execute(
    ...args: Params extends void ? [] : [Params]
  ): {
    subscribe: (onValue: (value: Result) => void, onError?: (error: Error) => void) => Subscription;
  } {
    const params = (args[0] ?? undefined) as Params;

    return {
      subscribe: (onValue, onError = () => {}) => {
        const result = this.doExecute(params, onValue, onError);
        return typeof result === 'function'
          ? { unsubscribe: result }
          : result;
      }
    };
  }
}
