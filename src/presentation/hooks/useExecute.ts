import { BaseException, UnknownException } from '../../domain/exceptions/BaseException';
import { Logger } from '../../util/Logger';

const logger = new Logger();

/**
 * Wraps use case execution with error handling and logging.
 * Mirrors KMP BaseViewModel.execute() pattern.
 *
 * Usage in ViewModel:
 *   const loadUsers = useCallback(() => {
 *     execute({
 *       action: () => getUsersUseCase.execute(),
 *       onLoading: () => setUiState(prev => ({ ...prev, isLoading: true, error: null })),
 *       onSuccess: (users) => setUiState({ users, isLoading: false, error: null }),
 *       onError: (e) => setUiState(prev => ({ ...prev, isLoading: false, error: e.userMessage })),
 *     });
 *   }, [getUsersUseCase]);
 */
export function execute<T>(params: {
  action: () => Promise<T>;
  onLoading?: () => void;
  onSuccess?: (result: T) => void;
  onError?: (error: BaseException) => void;
}): void {
  const { action, onLoading, onSuccess, onError } = params;

  onLoading?.();

  action()
    .then((result) => {
      onSuccess?.(result);
    })
    .catch((e: unknown) => {
      if (e instanceof BaseException) {
        logger.e(e.message, e);
        onError?.(e);
      } else {
        const wrapped = e instanceof Error ? new UnknownException(e) : new UnknownException();
        logger.e(wrapped.message, wrapped);
        onError?.(wrapped);
      }
    });
}
