import { useMemo } from 'react';
import { container } from 'tsyringe';

/**
 * Hook that resolves a dependency from the DI container.
 * Wraps the common useMemo + container.resolve pattern.
 *
 * Usage:
 *   const getRemoteNotesUseCase = useResolve<GetRemoteNotesUseCase>(TYPES.GetRemoteNotesUseCase);
 */
export function useResolve<T>(type: symbol): T {
  return useMemo(() => container.resolve<T>(type), [type]);
}
