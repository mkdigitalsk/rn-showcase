import { useState, useEffect, useCallback } from 'react';
import { TYPES } from '../../../app/diTypes';
import { GetTodayDateUseCase } from '../../../domain/useCases/calendar/GetTodayDateUseCase';
import { SelectionState } from '../../../domain/model/Calendar';
import { useResolve } from '../../hooks/useResolve';
import { execute } from '../../hooks/useExecute';
import { CalendarUiState, initialCalendarUiState } from './CalendarUiState';

const generateDisabledDates = (today: string): Set<string> => {
  const dates = new Set<string>();
  const base = new Date(today);

  // Generate a few sample disabled dates (e.g. 3, 7, 15, 22 days from today)
  [3, 7, 15, 22].forEach(offset => {
    const d = new Date(base);
    d.setDate(d.getDate() + offset);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    dates.add(`${year}-${month}-${day}`);
  });

  return dates;
};

const hasDisabledDateInRange = (
  start: string,
  end: string,
  disabledDates: Set<string>,
): boolean => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const current = new Date(startDate);

  while (current <= endDate) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    if (disabledDates.has(`${year}-${month}-${day}`)) {
      return true;
    }
    current.setDate(current.getDate() + 1);
  }
  return false;
};

export const useCalendarViewModel = () => {
  const [uiState, setUiState] = useState<CalendarUiState>(initialCalendarUiState);

  const getTodayDateUseCase = useResolve<GetTodayDateUseCase>(TYPES.GetTodayDateUseCase);

  useEffect(() => {
    execute({
      action: () => getTodayDateUseCase.execute(),
      onSuccess: (today) => {
        const disabledDates = generateDisabledDates(today);
        setUiState(prev => ({ ...prev, today, disabledDates }));
      },
    });
  }, [getTodayDateUseCase]);

  const onDateClick = useCallback((dateString: string) => {
    setUiState(prev => {
      if (prev.disabledDates.has(dateString)) {
        return prev;
      }

      switch (prev.selectionState) {
        case SelectionState.EMPTY:
          return {
            ...prev,
            selectionState: SelectionState.START_SELECTED,
            selectedRange: { startDate: dateString, endDate: null },
          };

        case SelectionState.START_SELECTED: {
          const start = prev.selectedRange.startDate!;

          if (dateString < start) {
            return {
              ...prev,
              selectedRange: { startDate: dateString, endDate: null },
            };
          }

          if (dateString === start) {
            return {
              ...prev,
              selectionState: SelectionState.EMPTY,
              selectedRange: { startDate: null, endDate: null },
            };
          }

          if (hasDisabledDateInRange(start, dateString, prev.disabledDates)) {
            return {
              ...prev,
              selectionState: SelectionState.START_SELECTED,
              selectedRange: { startDate: dateString, endDate: null },
            };
          }

          return {
            ...prev,
            selectionState: SelectionState.RANGE_SELECTED,
            selectedRange: { startDate: start, endDate: dateString },
          };
        }

        case SelectionState.RANGE_SELECTED:
          return {
            ...prev,
            selectionState: SelectionState.START_SELECTED,
            selectedRange: { startDate: dateString, endDate: null },
          };

        default:
          return prev;
      }
    });
  }, []);

  const clearSelection = useCallback(() => {
    setUiState(prev => ({
      ...prev,
      selectionState: SelectionState.EMPTY,
      selectedRange: { startDate: null, endDate: null },
    }));
  }, []);

  return {
    uiState,
    onDateClick,
    clearSelection,
  };
};
